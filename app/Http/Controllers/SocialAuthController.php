<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $this->_loginOrRegister($googleUser, 'google');
            return redirect()->intended(Auth::user()->isAdmin() ? '/admin/dashboard' : '/dashboard');
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'Google authentication failed.']);
        }
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function handleFacebookCallback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')->user();
            $this->_loginOrRegister($facebookUser, 'facebook');
            return redirect()->intended(Auth::user()->isAdmin() ? '/admin/dashboard' : '/dashboard');
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'Facebook authentication failed.']);
        }
    }

    protected function _loginOrRegister($socialUser, $provider)
    {
        $user = User::where($provider . '_id', $socialUser->getId())
            ->orWhere('email', $socialUser->getEmail())
            ->first();

        if ($user) {
            // Update social ID if missing
            if (!$user->{$provider . '_id'}) {
                $user->update([$provider . '_id' => $socialUser->getId()]);
            }
        } else {
            // Create new user
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'password' => null, // Social user might not have password
                $provider . '_id' => $socialUser->getId(),
                'avatar' => $socialUser->getAvatar(),
                'role' => 'user',
            ]);
        }

        Auth::login($user);
    }
}
