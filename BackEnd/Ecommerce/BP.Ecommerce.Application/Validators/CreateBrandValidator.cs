﻿using BP.Ecommerce.Application.DTOs;
using FluentValidation;

namespace BP.Ecommerce.Application.Validators
{
    public class CreateBrandValidator : AbstractValidator<CreateBrandDto>
    {
        public CreateBrandValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .WithMessage("No puede ser nulo o vacio");

            RuleFor(x => x.Name)
                .Matches("^[a-zA-Z0-9 ]+$")
                .WithMessage("Solo soporta numeros y letras");

            RuleFor(x => x.Name)
                .Must(name => WordsValidateUpper(name))
                .WithMessage("El nombre debe ser en mayusculas");

        }

        public bool WordsValidateUpper(string word)
        {
            if (word.ToUpper() == word)
            {
                return true;
            }
            return false;
        }
    }
}
