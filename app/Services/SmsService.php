<?php

namespace App\Services;

use App\Models\VerificationCode;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Singleton;
use Illuminate\Support\Facades\Http;

#[Singleton]
class SmsService
{
    public function sendOtp(string $phoneNumber)
    {
        $otp = (string)random_int(100000, 999999);

        if (VerificationCode::query()->where('phone', $phoneNumber)->exists()) {
            VerificationCode::query()->where('phone', $phoneNumber)->update([
                'code' => $otp,
                'expires_at' => Carbon::now()->addMinutes(5)
            ]);
        } else {
            VerificationCode::query()->create([
                'phone' => $phoneNumber,
                'code' => $otp,
                'expires_at' => Carbon::now()->addMinutes(5)
            ]);
        }
        $payload = [
            'phoneNumber' => $phoneNumber,
            'smsType' => 'verification',
            'verificationCode' => $otp,
//            'senderId' => '',
            'provider' => 'auto'
        ];
        $res = Http
            ::withHeader("Authorization", "Bearer " . env('OTPIQ_API_KEY'))
            ->post('https://api.otpiq.com/api/sms', $payload);

        if ($res->failed()) {
            logger()->error($res->body());
        }
    }
}
