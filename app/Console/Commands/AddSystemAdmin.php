<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class AddSystemAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:add-system-admin {phone}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $phone = $this->argument('phone');

        $user = User::query()->where('phone', $phone)->firstOrFail();

        $user->update(['is_system_admin' => true]);
    }
}
