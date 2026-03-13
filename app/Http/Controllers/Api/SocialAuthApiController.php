<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthApiController extends Controller
{
    public function loginWithGoogle(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        try {
            $socialUser = Socialite::driver('google')->stateless()->userFromToken($request->token);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Google token.',
            ], 401);
        }

        $user = User::where('google_id', $socialUser->getId())
            ->orWhere('email', $socialUser->getEmail())
            ->first();

        if (!$user) {
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'google_id' => $socialUser->getId(),
                'avatar' => $socialUser->getAvatar(),
                'role' => 'guest',
            ]);
        } elseif (!$user->google_id) {
            $user->update(['google_id' => $socialUser->getId()]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
        ]);
    }

    public function loginWithFacebook(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        try {
            $socialUser = Socialite::driver('facebook')->stateless()->userFromToken($request->token);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Facebook token.',
            ], 401);
        }

        if (!$socialUser->getEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Email is required from Facebook.',
            ], 422);
        }

        $user = User::where('facebook_id', $socialUser->getId())
            ->orWhere('email', $socialUser->getEmail())
            ->first();

        if (!$user) {
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'facebook_id' => $socialUser->getId(),
                'avatar' => $socialUser->getAvatar(),
                'role' => 'guest',
            ]);
        } elseif (!$user->facebook_id) {
            $user->update(['facebook_id' => $socialUser->getId()]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
        ]);
    }
}
