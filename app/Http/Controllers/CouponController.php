<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Coupons/Index', [
            'coupons' => Coupon::latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Coupons/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:coupons',
            'discount_percent' => 'required|integer|min:1|max:100',
            'valid_from' => 'required|date',
            'valid_until' => 'required|date|after:valid_from',
            'max_uses' => 'required|integer|min:0',
        ]);

        Coupon::create($validated);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon created successfully.');
    }

    public function show(Coupon $coupon)
    {
        return Inertia::render('Dashboard/Coupons/Show', [
            'coupon' => $coupon
        ]);
    }

    public function edit(Coupon $coupon)
    {
        return Inertia::render('Dashboard/Coupons/Edit', [
            'coupon' => $coupon
        ]);
    }

    public function update(Request $request, Coupon $coupon)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:coupons,code,' . $coupon->id,
            'discount_percent' => 'required|integer|min:1|max:100',
            'valid_from' => 'required|date',
            'valid_until' => 'required|date|after:valid_from',
            'max_uses' => 'required|integer|min:0',
        ]);

        $coupon->update($validated);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon updated successfully.');
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
