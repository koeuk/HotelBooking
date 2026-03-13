<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramMessage;

class PaymentReceivedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking->load(['user', 'room.hotel', 'room.roomType', 'payment']);
    }

    public function via(object $notifiable): array
    {
        $channels = ['mail', 'database'];

        if (config('services.telegram-bot-api.token') && env('TELEGRAM_ADMIN_CHAT_ID')) {
            $channels[] = 'telegram';
        }

        return $channels;
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Payment Received for Booking #' . $this->booking->id)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('We have successfully received your payment.')
            ->line('**Hotel:** ' . $this->booking->room->hotel->name)
            ->line('**Room:** ' . $this->booking->room->roomType->name . ' (#' . $this->booking->room->room_number . ')')
            ->line('**Check-in:** ' . $this->booking->check_in_date->format('M d, Y'))
            ->line('**Check-out:** ' . $this->booking->check_out_date->format('M d, Y'))
            ->line('**Amount Paid:** $' . $this->booking->total_price)
            ->line('**Payment Method:** ' . strtoupper($this->booking->payment->method ?? 'N/A'))
            ->line('**Transaction ID:** ' . ($this->booking->payment->transaction_id ?? 'N/A'))
            ->action('View Booking', url('/dashboard'))
            ->line('Thank you for your payment!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_received',
            'title' => 'Payment Received',
            'message' => 'Payment of $' . $this->booking->total_price . ' received for booking at ' . $this->booking->room->hotel->name,
            'booking_id' => $this->booking->id,
            'hotel_name' => $this->booking->room->hotel->name,
        ];
    }

    public function toTelegram($notifiable)
    {
        $url = url('/admin/bookings/' . $this->booking->id);

        return TelegramMessage::create()
            ->to(env('TELEGRAM_ADMIN_CHAT_ID'))
            ->content(
                "💳 *Payment Received - Booking #" . $this->booking->id . "*\n\n" .
                "👤 Guest: {$this->booking->user->name}\n" .
                "🏠 Hotel: {$this->booking->room->hotel->name}\n" .
                "💰 Amount: \${$this->booking->total_price}\n" .
                "💳 Method: " . strtoupper($this->booking->payment->method ?? 'N/A') . "\n" .
                "🔖 Transaction: " . ($this->booking->payment->transaction_id ?? 'N/A')
            )
            ->button('View Booking', $url);
    }
}
