<?php

namespace App\Models;

class TenantDeliverySettings
{
    public $delivery_fee;
    public $additional_delivery_fee;
    public $allow_delivery;

    function __construct(int $delivery_fee = 0, array $additional_delivery_fee = [], bool $allow_delivery = false)
    {
        $this->delivery_fee = $delivery_fee;
        $this->additional_delivery_fee = $additional_delivery_fee;
        $this->allow_delivery = $allow_delivery;
    }

    public function toArray()
    {
        return [
            'delivery_fee' => $this->delivery_fee,
            'additional_delivery_fee' => $this->additional_delivery_fee,
            'allow_delivery' => $this->allow_delivery,
        ];
    }
}
