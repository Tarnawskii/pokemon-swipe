import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SwipeEntry, User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async registerUser(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<boolean> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create a new User entity
      const user = new User();
      user.username = userData.username;
      user.email = userData.email;
      user.password = hashedPassword;

      // Save the user to the database
      await this.userRepository.save(user);

      return true;
    } catch (error) {
      return false;
    }
  }

  async loginUser(
    identifier: string,
    password: string,
  ): Promise<{ success: boolean; username?: string }> {
    try {
      // Find user by username or email
      // Try to find user by username first
      let user = await this.userRepository.findOneBy({ username: identifier });

      // If not found, try by email
      if (!user) {
        user = await this.userRepository.findOneBy({ email: identifier });
      }

      if (!user) return { success: false };

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { success: false };
      }

      return { success: true, username: user.username };
    } catch (error) {
      return { success: false };
    }
  }
  async recordSwipe(swipeData: {
    username: string;
    pokemonId: number;
    action: 'like' | 'dislike';
    name?: string;
    joke?: string;
  }): Promise<boolean> {
    if (swipeData.name === undefined || swipeData.joke === undefined) {
      return false;
    }

    try {
      const user = await this.userRepository.findOne({
        where: { username: swipeData.username },
      });

      if (!user) return false;

      if (swipeData.action === 'like') {
        user.likes = user.likes || [];
        user.likes.push({
          pokemonId: swipeData.pokemonId,
          name: swipeData.name,
          joke: swipeData.joke,
        });
      } else if (swipeData.action === 'dislike') {
        user.dislikes = user.dislikes || [];
        user.dislikes.push({
          pokemonId: swipeData.pokemonId,
          name: swipeData.name,
          joke: swipeData.joke,
        });
      }

      await this.userRepository.save(user);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getSwipes(
    username: string,
  ): Promise<{ likedPokemons: SwipeEntry[]; dislikedPokemons: SwipeEntry[] }> {
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
    } catch (error) {
      return { likedPokemons: [], dislikedPokemons: [] };
    }
  }
}
