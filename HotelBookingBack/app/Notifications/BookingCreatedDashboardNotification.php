<?php

namespace App\Notifications;

use App\Models\Booking;
use App\Models\Setting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramMessage;

class BookingCreatedDashboardNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking->load(['user', 'room.hotel', 'room.roomType']);
    }

    public function via(object $notifiable): array
    {
        $channels = ['mail', 'database'];

        $chatId = Setting::get('telegram_chat_id') ?: env('TELEGRAM_ADMIN_CHAT_ID');
        if (config('services.telegram-bot-api.token') && $chatId) {
            $channels[] = 'telegram';
        }

        return $channels;
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Booking Reservation #' . $this->booking->id)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('A new booking reservation has been placed.')
            ->line('**user:** ' . $this->booking->user->name . ' (' . $this->booking->user->email . ')')
            ->line('**Hotel:** ' . $this->booking->room->hotel->name)
            ->line('**Room:** ' . $this->booking->room->roomType->name . ' (#' . $this->booking->room->room_number . ')')
            ->line('**Check-in:** ' . $this->booking->check_in_date->format('M d, Y'))
            ->line('**Check-out:** ' . $this->booking->check_out_date->format('M d, Y'))
            ->line('**Total Price:** $' . $this->booking->total_price)
            ->action('View in Admin Panel', url('/admin/bookings/' . $this->booking->id))
            ->line('Please review and confirm the booking.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'booking_created',
            'title' => 'New Booking #' . $this->booking->id,
            'message' => $this->booking->user->name . ' booked ' . $this->booking->room->hotel->name . ' (' . $this->booking->room->roomType->name . ')',
            'booking_id' => $this->booking->id,
            'hotel_name' => $this->booking->room->hotel->name,
            'url' => '/admin/bookings/' . $this->booking->id,
        ];
    }

    public function toTelegram($notifiable)
    {
        $url = url('/admin/bookings/' . $this->booking->id);

        $chatId = Setting::get('telegram_chat_id') ?: env('TELEGRAM_ADMIN_CHAT_ID');

        $message = TelegramMessage::create()
            ->to($chatId)
            ->content(
                "🏨 *New Booking Reservation #" . $this->booking->id . "*\n\n" .
                "👤 user: {$this->booking->user->name}\n" .
                "📧 Email: {$this->booking->user->email}\n" .
                "🏠 Hotel: {$this->booking->room->hotel->name}\n" .
                "🛏 Room: {$this->booking->room->roomType->name} (#{$this->booking->room->room_number})\n" .
                "📅 Dates: {$this->booking->check_in_date->format('M d, Y')} - {$this->booking->check_out_date->format('M d, Y')}\n" .
                "💰 Total: \${$this->booking->total_price}\n\n" .
                "Status: *Pending*"
            );

        if (!str_contains($url, 'localhost')) {
            $message->button('View Booking', $url);
        }

        return $message;
    }
}
