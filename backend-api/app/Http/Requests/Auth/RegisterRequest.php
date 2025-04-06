<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8',
                'regex:/[A-Z]/', // At least a capital letter
                'regex:/[a-z]/', // At least a lowercase letter
                'regex:/[0-9]/', // At least a number
                'regex:/[@$!%*?&]/', // At least a special character
            ],
        ];
    }

    public function messages() {
        return [
            'password.regex' => 'Parola trebuie să conțină cel puțin o literă mare, o literă mică, o cifră și un caracter special.',
        ];
    }
}
