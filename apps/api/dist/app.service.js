"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = __importStar(require("bcrypt"));
let AppService = class AppService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getHello() {
        return 'Hello World!';
    }
    async registerUser(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = new user_entity_1.User();
            user.username = userData.username;
            user.email = userData.email;
            user.password = hashedPassword;
            await this.userRepository.save(user);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async loginUser(identifier, password) {
        try {
            let user = await this.userRepository.findOneBy({ username: identifier });
            if (!user) {
                user = await this.userRepository.findOneBy({ email: identifier });
            }
            if (!user)
                return { success: false };
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { success: false };
            }
            return { success: true, username: user.username };
        }
        catch (error) {
            return { success: false };
        }
    }
    async recordSwipe(swipeData) {
        if (swipeData.name === undefined || swipeData.joke === undefined) {
            return false;
        }
        try {
            const user = await this.userRepository.findOne({
                where: { username: swipeData.username },
            });
            if (!user)
                return false;
            if (swipeData.action === 'like') {
                user.likes = user.likes || [];
                user.likes.push({
                    pokemonId: swipeData.pokemonId,
                    name: swipeData.name,
                    joke: swipeData.joke,
                });
            }
            else if (swipeData.action === 'dislike') {
                user.dislikes = user.dislikes || [];
                user.dislikes.push({
                    pokemonId: swipeData.pokemonId,
                    name: swipeData.name,
                    joke: swipeData.joke,
                });
            }
            await this.userRepository.save(user);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async getSwipes(username) {
        try {
            const user = await this.userRepository.findOne({
                where: { username },
            });
            if (!user) {
                return { likedPokemons: [], dislikedPokemons: [] };
            }
            return {
                likedPokemons: user.likes || [],
                dislikedPokemons: user.dislikes || [],
            };
        }
        catch (error) {
            return { likedPokemons: [], dislikedPokemons: [] };
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map