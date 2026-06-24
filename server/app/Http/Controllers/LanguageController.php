<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class LanguageController extends Controller
{
    private const LANG_NAMES = [
        'en' => 'English',
        'ru' => 'Русский',
        'de' => 'Deutsch',
        'fr' => 'Français',
        'es' => 'Español',
        'it' => 'Italiano',
        'cn' => '中文',
        'ae' => 'العربية',
    ];

    public function index(): JsonResponse
    {
        $langs = DB::table('rc_cars_translations')
            ->distinct()
            ->pluck('lang');

        $result = $langs->map(fn($code) => [
            'code' => $code,
            'name' => self::LANG_NAMES[$code] ?? strtoupper($code),
        ])->sortBy('name')->values();

        return response()->json($result);
    }
}
