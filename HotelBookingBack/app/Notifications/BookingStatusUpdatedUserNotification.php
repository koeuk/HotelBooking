<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingStatusUpdatedUserNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $booking;
    protected $status;

    public function __construct(Booking $booking, string $status)
    {
        $this->booking = $booking->load(['user', 'room.hotel', 'room.roomType']);
        $this->status = $status;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage);

        if ($this->status === 'confirmed') {
            $message->subject('Booking Confirmed #' . $this->booking->id)
                ->greeting('Great news, ' . $notifiable->name . '!')
                ->line('Your booking has been confirmed.')
                ->line('**Hotel:** ' . $this->booking->room->hotel->name)
                ->line('**Room:** ' . $this->booking->room->roomType->name . ' (#' . $this->booking->room->room_number . ')')
                ->line('**Check-in:** ' . $this->booking->check_in_date->format('M d, Y'))
                ->line('**Check-out:** ' . $this->booking->check_out_date->format('M d, Y'))
                ->line('**Total Price:** $' . $this->booking->total_price)
                ->action('View Booking', url('/dashboard'))
                ->line('We look forward to welcoming you!');
        } elseif ($this->status === 'cancelled') {
            $message->subject('Booking Cancelled #' . $this->booking->id)
                ->greeting('Hello ' . $notifiable->name . ',')
                ->line('Your booking has been cancelled.')
                ->line('**Hotel:** ' . $this->booking->room->hotel->name)
                ->line('**Room:** ' . $this->booking->room->roomType->name . ' (#' . $this->booking->room->room_number . ')')
                ->line('**Check-in:** ' . $this->booking->check_in_date->format('M d, Y'))
                ->line('**Check-out:** ' . $this->booking->check_out_date->format('M d, Y'))
                ->action('Book Again', url('/dashboard'))
                ->line('We hope to see you again soon.');
        } elseif ($this->status === 'completed') {
            $message->subject('Booking Completed #' . $this->booking->id)
                ->greeting('Thank you, ' . $notifiable->name . '!')
                ->line('Your stay has been marked as completed.')
                ->line('**Hotel:** ' . $this->booking->room->hotel->name)
                ->action('View Booking', url('/dashboard'))
                ->line('We hope you had a wonderful stay!');
        } else {
            $message->subject('Booking Update #' . $this->booking->id)
                ->greeting('Hello ' . $notifiable->name . ',')
                ->line('Your booking status has been updated to: ' . ucfirst($this->status) . '.')
                ->action('View Booking', url('/dashboard'));
        }

        return $message;
    }

    public function toArray(object $notifiable): array
    {
        $titles = [
            'confirmed' => 'Booking Confirmed',
            'cancelled' => 'Booking Cancelled',
            'completed' => 'Stay Completed',
        ];

        $messages = [
            'confirmed' => 'Your booking at ' . $this->booking->room->hotel->name . ' has been confirmed.',
            'cancelled' => 'Your booking at ' . $this->booking->room->hotel->name . ' has been cancelled.',
            'completed' => 'Your stay at ' . $this->booking->room->hotel->name . ' is marked as completed.',
        ];

        return [
            'type' => 'booking_status_updated',
            'title' => $titles[$this->status] ?? 'Booking Updated',
            'message' => $messages[$this->status] ?? 'Your booking status has been updated to: ' . ucfirst($this->status) . '.',
            'booking_id' => $this->booking->id,
            'status' => $this->status,
            'hotel_name' => $this->booking->room->hotel->name,
        ];
    }
}
