<?php

namespace App\Models;

enum Subscription: string
{
    case Free = 'free';
    case Pro = 'pro';
    case Premium = 'premium';
}
