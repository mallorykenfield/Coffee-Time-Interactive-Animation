import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;
export class CoffeeModel {
    constructor() {
        this.iced = false;
        this.hot = false;
        this.mug0 = false;
        this.mug1 = false;
        this.mug2 = false;
        this.cup = false;
        this.straw1 = false;
        this.straw2 = false;
        this.dark_roast = false;
        this.light_roast = false;
        this.milk = false;
        this.shade = hex_color("#ffffff");
        this.sugar = false;
        this.whipped_cream = false;
        this.cinnamon = false;
        this.marshmallow = false;
        this.creamandmarsh = false;
    }
    make_iced() {
        this.iced = true;
        this.hot = false;
        this.mug0 = false;
        this.mug1 = false;
        this.mug2 = false;
        this.cup = true;
    }
    make_hot() {
        this.iced = false;
        this.hot = true;
        this.straw1 = false;
        this.straw2 = false;
        this.cup = false;
        if (this.mug1) {
            this.mug0 = false;
            this.mug2 = false;
        }
        else if (this.mug2) {
            this.mug0 = false;
            this.mug1 = false;
        }
        else {
            this.mug0 = true;
            this.mug1 = false;
            this.mug2 = false;
        }

    }
    pick_mug1() {
        if (this.iced) {
            return;
        }
        this.mug0 = false;
        this.mug2 = false;
        if (this.mug1) {
            this.mug1 = false;
        }
        else {
            this.mug1 = true;
        }
    }
    pick_mug2() {
        if (this.iced) {
            return;
        }
        this.mug0 = false;
        this.mug1 = false;
        if (this.mug2) {
            this.mug2 = false;
        }
        else {
            this.mug2 = true;
        }
    }
    add_straw1() {
        if (this.hot) {
            return;
        }
        this.straw2 = false;
        if (this.straw1) {
            this.straw1 = false;
        }
        else {
            this.straw1 = true;
        }
    }
    add_straw2() {
        if (this.hot) {
            return;
        }
        this.straw1 = false;
        if (this.straw2) {
            this.straw2 = false;
        }
        else {
            this.straw2 = true;
        }
    }
    pick_color() {
        if (this.light_roast && !this.milk) {
            this.shade = hex_color("#613613");
        }
        if (this.dark_roast && !this.milk) {
            this.shade = hex_color("#362312");
        }
        if (this.dark_roast && this.milk) {
            this.shade = hex_color("#613613");
        }
        if (this.light_roast && this.milk) {
            this.shade = hex_color("#824f24");
        }
        if (!this.light_roast && !this.dark_roast && this.milk) {
            this.shade = hex_color("#ffffff");
        }
    }
    pick_light() {
        this.light_roast = true;
        this.dark_roast = false;
        this.pick_color();
    }
    pick_dark() {
        this.light_roast = false;
        this.dark_roast = true;
        this.pick_color();
    }
    toggle_milk() {
        this.milk = !this.milk;
        this.pick_color();
    }
    toggle_sugar() {
        this.sugar = !this.sugar;
    }
    toggle_whipped() {
        this.whipped_cream = !this.whipped_cream;
    }
    toggle_marshmallows() {
        this.marshmallow = !this.marshmallow;
    }
    toggle_cinnamon() {
        this.cinnamon = !this.cinnamon;
    }
}