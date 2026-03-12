<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramMessage;

class BookingNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $booking;
    protected $type;

    /**
     * Create a new notification instance.
     */
    public function __construct(Booking $booking, string $type = 'created')
    {
        $this->booking = $booking->load(['user', 'room.hotel', 'room.roomType']);
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'telegram'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject($this->getSubject())
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line($this->getIntroLine());

        if ($this->type === 'created' || $this->type === 'updated') {
            $message->line('Hotel: ' . $this->booking->room->hotel->name)
                ->line('Room: ' . $this->booking->room->roomType->name . ' (#' . $this->booking->room->room_number . ')')
                ->line('Check-in: ' . $this->booking->check_in_date->format('M d, Y'))
                ->line('Check-out: ' . $this->booking->check_out_date->format('M d, Y'))
                ->line('Total Price: $' . $this->booking->total_price);
        }

        return $message->action('View Booking', url('/dashboard'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'type' => $this->type,
            'status' => $this->booking->status,
            'message' => $this->getIntroLine(),
            'hotel_name' => $this->booking->room->hotel->name,
        ];
    }

    /**
     * Get the Telegram representation of the notification.
     */
    public function toTelegram($notifiable)
    {
        $url = url('/admin/bookings/' . $this->booking->id);

        return TelegramMessage::create()
            ->to(env('TELEGRAM_ADMIN_CHAT_ID'))
            ->content("*{$this->getSubject()}*\n\n" . $this->getIntroLine() . "\n" .
                "Guest: {$this->booking->user->name}\n" .
                "Hotel: {$this->booking->room->hotel->name}\n" .
                "Dates: {$this->booking->check_in_date->format('M d')} - {$this->booking->check_out_date->format('M d')}\n" .
                "Total: \${$this->booking->total_price}")
            ->button('View Booking', $url);
    }

    protected function getSubject(): string
    {
        return match($this->type) {
            'created' => 'New Booking Reservation #' . $this->booking->id,
            'updated' => 'Booking Status Updated #' . $this->booking->id,
            'payment' => 'Payment Received for Booking #' . $this->booking->id,
            default => 'Booking Notification',
        };
    }

    protected function getIntroLine(): string
    {
        return match($this->type) {
            'created' => 'A new booking reservation has been placed.',
            'updated' => "The status of your booking has been updated to: {$this->booking->status}.",
            'payment' => 'We have successfully received your payment.',
            default => 'There is an update regarding your booking.',
        };
    }
}
