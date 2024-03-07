import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import EventQueue from "../../Wolfie2D/Events/EventQueue";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import PlayerController from "../Player/PlayerController";
import PlayerState from "../Player/PlayerStates/PlayerState";
import GameLevel from "../Scenes/GameLevel";
import { HW5_Events } from "../hw5_enums";
import BalloonState from "./BalloonState";

// HOMEWORK 5 - TODO
/**
 * For this homework, you'll have to implement an additional state to the AI from scratch.
 * 
 * This new behavior should be for the zero gravity balloon state, where the balloon no
 * longer has gravity affecting it.
 * 
 * Along with this, the balloon should move twice it's current velocity if it's close
 * to the player, within about 10 tiles. You only have to apply this speed change to the
 * x velocity, the y velocity will be left unchanged.
 * 
 * When the player moves far enough away again, the balloon should return to it's original velocity.
 * 
 * You can implement this method how you see fit, there's no one way of doing it. Look at events that
 * are fired to get the player position
 */
export default class ZeroGravity extends BalloonState {
	onEnter(): void {
		this.gravity = 0;
	}

	update(deltaT: number): void{
		// Get player position
		// Unsure how to do so
		let player_pos = this.parent.owner.relativePosition;
		let px = player_pos.x;
		let py = player_pos.y;
		// Get distance between balloon and player
		let distance = Math.sqrt(Math.pow(this.owner.positionX - px, 2) + Math.pow(this.owner.positionY - py, 2));
		let current_distance_state = 1;				// 1 is if within 10 tiles; 0 is if outside of ten tiles range
		if (distance <= 10 && current_distance_state == 0){			// If has reached within ten tiles range
			this.parent.velocity.x = 2 * this.parent.velocity.x;	// Double x velocity
		}
		if (distance > 10 && current_distance_state == 1){			// If has reached beyond 10 tile range
			this.parent.velocity.x = 0.5 * this.parent.velocity.x;	// Half the x velocity back to normal
		}
	}

	onExit(): Record<string, any> {
		this.gravity = 500;
		return {};
	}
}