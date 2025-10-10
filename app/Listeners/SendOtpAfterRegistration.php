<?php

namespace App\Listeners;

use App\Models\VerificationCode;
use App\Services\SmsService;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Http;
use Random\RandomException;

class SendOtpAfterRegistration
{
    private SmsService $smsService;

    /**
     * Create the event listener.
     */
    public function __construct(SmsService $smsService)
    {
        //
        $this->smsService = $smsService;
    }

    /**
     * Handle the event.
     * @throws RandomException
     */
    public function handle(Registered $event): void
    {
        $this->smsService->sendOtp($event->user->phone);
    }
}








