<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\VerificationCode;
use App\Services\SmsService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VerificationController extends Controller
{

    private SmsService $smsService;

    function __construct(SmsService $smsService)
    {

        $this->smsService = $smsService;
    }
    public function show()
    {
        if(auth()->user()->phone_verified_at !== null){
            return redirect()->intended(route('dashboard', absolute: false));
        }
        return inertia('auth/otp');
    }

    public function verify(Request $request)
    {
        if(auth()->user()->phone_verified_at !== null){
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $request->validate([
            'code' => 'required|string|max:6|min:6'
        ]);

        $code = VerificationCode::query()->where('phone', auth()->user()->phone)->firstOrFail();
        if(Carbon::parse($code->expires_at) < Carbon::now() || $code->code !== $request->code)
            return back()->withErrors(['code' => 'رمز التحقق غير صحيح او منتهي الصلاحية']);

        auth()->user()->update(['phone_verified_at' => Carbon::now()]);
        return redirect()->intended(route('dashboard', absolute: false));
    }


    public function resend(Request $request)
    {
        if(auth()->user()->phone_verified_at !== null){
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $phone = auth()->user()->phone;
        $this->smsService->sendOtp($phone);
        return back()->with('status', 'otp resent');
    }
}

















