<?php

namespace App\Models;

class TenantSettings
{

    public $display_name;
    public $logo_url;
    public $working_days;

    public $working_starts;
    public $working_ends;

    function __construct(string $display_name, string $logo_url, array $working_days, $working_starts, $working_ends)
    {
        $this->display_name = $display_name;
        $this->logo_url = $logo_url;
        $this->working_days = $working_days;
        $this->working_starts = $working_starts;
        $this->working_ends = $working_ends;
    }

    public function toArray()
    {
        return [
            'display_name' => $this->display_name,
            'logo_url' => $this->logo_url,
            'working_days' => $this->working_days,
            'working_starts' => $this->working_starts,
            'working_ends' => $this->working_ends,
        ];
    }
}
