<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 255);
            $table->string('description', 1000)->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discounted_price', 10, 2);
            $table->string('image', 255)->nullable();
            $table->foreignUuid('category_id')->constrained('categories')->onDelete('cascade');
            $table->boolean('is_active')->default(true);
            $table->json('addons')->nullable();
            $table->json('options')->nullable();
            $table->json('branches_unavailable')->nullable();

            $table->uuid('tenant_id')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
