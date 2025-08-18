import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

export class Marshmallow {
    constructor(shape, milk_base, milk_top) {
        this.frame = 0;
        this.shape = shape;
        this.milk_base = milk_base;
        this.milk_top = milk_top;
    }
    start_animation() {
        // keeps track of when animation began
        this.frame = 0;
    }

    display(context, program_state, model_transform) {
        // 1. find the amount of time that has passed since the previous frame (aka last frame time)
        // 2. add above to current time
        // 3. based on current time, calculate carton transform
        // 4. draw

        let milk_drop = model_transform.times(Mat4.translation(1.2, 8, 2))
            .times(Mat4.scale(0.5, 20, 0.5));
        // phase 1 is motion from A to B
        // phase 2 is carton staying at B, w slight rotation
        // phase 3 is carton moving from B to A
        // phase 4 is carton staying at A
        let p1_end = 1000;
        let p2_end = 2700;
        let p3_end = 3000;
        // starting point
        let a_x = -4;
        let a_y = 0;
        let a_z = -6;
        // offset from start
        let b_y = 5;

        let t_x = 1;
        let t_y = 0.195;
        let t_z = 0.146;

        let milk_base_transform = model_transform;
        let milk_top_transform = model_transform;
        if (this.frame > p3_end) { // currently in phase 4
            let t = this.frame; // time spent in current phase
            let d = p1_end; // time current phase takes
            let r = 0;
            milk_base_transform = model_transform.times(Mat4.translation(a_x, a_y + 4, a_z))
                .times(Mat4.scale(2, 2, 2))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            // let x = Math.cos(r*1.5) * b_y;
            // let y = Math.sin(r*1.5) * b_y;
            // let offset = Mat4.translation(-x, y, 0);
            milk_base_transform = milk_base_transform.times(Mat4.translation(a_x, a_y, a_z * r))
                // .times(Mat4.rotation(Math.PI/4 * r, 0, 0, -1));
            // milk_top_transform = milk_base_transform.times(Mat4.translation(0, 1.15, 0))
            //     .times(Mat4.scale(t_x, t_y, t_z));
        }
        else if (this.frame > p2_end) { // currently in phase 3
            let t = this.frame - p2_end; // time spent in current phase
            let d = p3_end - p2_end; // time current phase takes
            let r = t / d;
            r = 1.0 - r;
            milk_base_transform = model_transform.times(Mat4.translation(a_x, a_y + 4, a_z))
                .times(Mat4.scale(2, 2, 2))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            // let x = Math.cos(r*1.5) * b_y;
            // let y = Math.sin(r*1.5) * b_y;
            // let offset = Mat4.translation(-x, y, 0);
            milk_base_transform = milk_base_transform.times(Mat4.translation(a_x, a_y, a_z * r))
                // .times(Mat4.rotation(Math.PI/4 * r, 0, 0, -1));
            // milk_top_transform = milk_base_transform.times(Mat4.translation(0, 1.15, 0))
            //     .times(Mat4.scale(t_x, t_y, t_z));
        }
        // else if (this.frame > p1_end) { // currently in phase 2
        //     let t = this.frame; // time spent in current phase
        //     let d = p1_end; // time current phase takes
        //     let r = 1;
        //     milk_base_transform = model_transform.times(Mat4.translation(a_x, a_y, a_z))
        //         .times(Mat4.scale(4.3, 4.3, 4.3));
        //     let x = Math.cos(r*1.5) * b_y;
        //     let y = Math.sin(r*1.5) * b_y;
        //     let offset = Mat4.translation(-x, y, 0);
        //     milk_base_transform = milk_base_transform.times(offset)
        //         .times(Mat4.rotation(Math.PI/4 * r, 0, 0, -1));
        //     milk_top_transform = milk_base_transform.times(Mat4.translation(0, 1.15, 0))
        //         .times(Mat4.scale(t_x, t_y, t_z));
        //     this.shape.draw(context, program_state, milk_drop, this.milk_top);
        // }
        // else { // phase 1
        //     let t = this.frame; // time spent in current phase
        //     let d = p1_end; // time current phase takes
        //     let r = t / d;
        //     milk_base_transform = model_transform.times(Mat4.translation(a_x, a_y, a_z))
        //         .times(Mat4.scale(4.3, 4.3, 4.3));
        //     let x = Math.cos(r*1.5) * b_y;
        //     let y = Math.sin(r*1.5) * b_y;
        //     let offset = Mat4.translation(-x, y, 0);
        //     milk_base_transform = milk_base_transform.times(offset)
        //         .times(Mat4.rotation(Math.PI/4 * r, 0, 0, -1));
        //     milk_top_transform = milk_base_transform.times(Mat4.translation(0, 1.15, 0))
        //         .times(Mat4.scale(t_x, t_y, t_z));
        // }

        this.frame += program_state.animation_delta_time;

        this.shape.draw(context, program_state, milk_base_transform, this.milk_base);
        this.shape.draw(context, program_state, milk_top_transform, this.milk_top);
    }
}
