<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Dashboard/Settings/Index', [
            'settings' => [
                'telegram_chat_id' => Setting::get('telegram_chat_id', ''),
                'telegram_bot_token' => Setting::get('telegram_bot_token', ''),
            ],
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'telegram_chat_id' => 'nullable|string|max:255',
            'telegram_bot_token' => 'nullable|string|max:255',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Settings updated successfully.');
    }
}
