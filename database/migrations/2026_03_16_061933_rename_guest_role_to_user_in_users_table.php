<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up(): void
    {
        // Change enum to include 'user', then update data, then remove 'guest'
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('guest', 'admin', 'user') NOT NULL DEFAULT 'user'");
        DB::table('users')->where('role', 'guest')->update(['role' => 'user']);
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('user', 'admin') NOT NULL DEFAULT 'user'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('user', 'admin', 'guest') NOT NULL DEFAULT 'guest'");
        DB::table('users')->where('role', 'user')->update(['role' => 'guest']);
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('guest', 'admin') NOT NULL DEFAULT 'guest'");
    }
};
