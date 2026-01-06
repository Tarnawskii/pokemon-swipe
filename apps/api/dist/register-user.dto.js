"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSwipesDto = exports.SwipeDto = exports.LoginUserDto = exports.RegisterUserDto = void 0;
class RegisterUserDto {
    username;
    email;
    password;
}
exports.RegisterUserDto = RegisterUserDto;
class LoginUserDto {
    identifier;
    password;
}
exports.LoginUserDto = LoginUserDto;
class SwipeDto {
    username;
    pokemonId;
    action;
    name;
    joke;
}
exports.SwipeDto = SwipeDto;
class GetSwipesDto {
    username;
}
exports.GetSwipesDto = GetSwipesDto;
//# sourceMappingURL=register-user.dto.js.map