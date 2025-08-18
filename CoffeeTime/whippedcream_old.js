import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

export class WhippedCream {
    constructor(shape_base, shape_middle, shape_top, shape_cream, whipped_base, whipped_middle, whipped_top, cream) {
        this.frame = 0;
        this.shape_base = shape_base;
        this.shape_middle = shape_middle;
        this.shape_top = shape_top;
        this.shape_cream = shape_cream;
        this.whipped_base = whipped_base;
        this.whipped_middle = whipped_middle;
        this.whipped_top = whipped_top;
        this.cream = cream;
    }
    start_animation() {
        // keeps track of when animation began
        this.frame = 0;
    }

    display(context, program_state, model_transform) {
        // building the cream
        let cream_transform1 = model_transform.times(Mat4.translation(5, 19.3, 2))
            .times(Mat4.scale(6.3, 4.5, 6.3))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        let cream_transform2 = model_transform.times(Mat4.translation(5, 21.3, 2))
            .times(Mat4.scale(5, 4, 5))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        let cream_transform3 = model_transform.times(Mat4.translation(5, 23.3, 2))
            .times(Mat4.scale(3.5, 3.5, 3.5))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        let cream_transform4 = model_transform.times(Mat4.translation(5, 25, 2))
            .times(Mat4.scale(2, 3, 2))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        let cream_transform5 = model_transform.times(Mat4.translation(5, 26, 2))
            .times(Mat4.scale(1, 2.5, 1))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        let cream_transform6 = model_transform.times(Mat4.translation(5, 25.8, 2))
            .times(Mat4.scale(0.5, 2, 0.5))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0));

        // phase 1 is motion from A to B
        // phase 2 is container staying at B, w slight rotation
        // phase 3 is container moving from B to A
        // phase 4 is container staying at A
        let p1_end = 1000;
        let p2_end = 2000;
        let p3_end = 3000;
        // starting point
        let a_x = -8;
        let a_y = 0;
        let a_z = -4;
        // offset from start
        let b_y = 5;

        let t_x = 1;
        let t_y = 0.195;
        let t_z = 0.146;

        let whipped_base_transform = model_transform;
        let whipped_middle_transform = model_transform;
        let whipped_top_transform = model_transform;

        // phase 4
        if (this.frame > p3_end) {
            let t = this.frame;
            let d = p1_end;
            let r = 0;
            whipped_base_transform = model_transform.times(Mat4.translation(a_x, a_y + 10, a_z))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0))
                .times(Mat4.scale(2.5, 2.5, 16));
            let x = Math.cos(r/2) * b_y;
            let y = Math.sin(r/2) * b_y;
            let offset = Mat4.translation(x - 8, 0, -y);
            whipped_base_transform = whipped_base_transform.times(offset)
                .times(Mat4.rotation(Math.PI * r, 0, -1, 0));
            whipped_middle_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.5))
                .times(Mat4.scale(0.98, 0.98, 0.15))
                //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            whipped_top_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.45))
                .times(Mat4.scale(0.4, 0.4, 0.6875))
                //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            this.shape_cream.draw(context, program_state, cream_transform1, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform2, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform3, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform4, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform5, this.cream);
        }
        // phase 3
        else if (this.frame > p2_end) {
            let t = this.frame - p2_end;
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            whipped_base_transform = model_transform.times(Mat4.translation(a_x, a_y + 10, a_z))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0))
                .times(Mat4.scale(2.5, 2.5, 16));
            let x = Math.cos(r/2) * b_y;
            let y = Math.sin(r/2) * b_y;
            let offset = Mat4.translation(x - 8, 0, -y);
            whipped_base_transform = whipped_base_transform.times(offset)
                .times(Mat4.rotation(Math.PI/2 * r, 0, -1, 0));
            whipped_middle_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.5))
                .times(Mat4.scale(0.98, 0.98, 0.15))
                //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            whipped_top_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.45))
                .times(Mat4.scale(0.4, 0.4, 0.6875))
                //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            this.shape_cream.draw(context, program_state, cream_transform1, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform2, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform3, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform4, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform5, this.cream);
        }
        // phase 2
        else if (this.frame > p1_end) {
            let t = this.frame;
            let d = p1_end;
            let r = 1;
            whipped_base_transform = model_transform.times(Mat4.translation(a_x, a_y + 10, a_z))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0))
                .times(Mat4.scale(2.5, 2.5, 16));
            let x = Math.cos(r/2) * b_y;
            let y = Math.sin(r/2) * b_y;
            let offset = Mat4.translation(x - 8, 0, -y);
            whipped_base_transform = whipped_base_transform.times(offset)
                .times(Mat4.rotation(Math.PI/2 * r, 0, -1, 0));
            whipped_middle_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.5))
                .times(Mat4.scale(0.98, 0.98, 0.15))
            //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            whipped_top_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.45))
                .times(Mat4.scale(0.4, 0.4, 0.6875))
            //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            this.shape_cream.draw(context, program_state, cream_transform1, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform2, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform3, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform4, this.cream);
            this.shape_cream.draw(context, program_state, cream_transform5, this.cream);
        }
        else {
            let t = this.frame;
            let d = p1_end;
            let r = t/d;
            whipped_base_transform = model_transform.times(Mat4.translation(a_x, a_y + 10, a_z))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0))
                .times(Mat4.scale(2.5, 2.5, 16));
            let x = Math.cos(r/2) * b_y;
            let y = Math.sin(r/2) * b_y;
            let offset = Mat4.translation(x - 8, 0, -y);
            whipped_base_transform = whipped_base_transform.times(offset)
                .times(Mat4.rotation(Math.PI/2 * r, 0, -1, 0));
            whipped_middle_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.5))
                .times(Mat4.scale(0.98, 0.98, 0.15))
            //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            whipped_top_transform = whipped_base_transform.times(Mat4.translation(0, 0, -0.45))
                .times(Mat4.scale(0.4, 0.4, 0.6875))
            //.times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        }

        // let whipped_base_transform = model_transform.times(Mat4.translation(-8, 28, 2))
        //     .times(Mat4.scale(2.5, 16, 2.5))
        //     .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        // this.shape_base.draw(context, program_state, whipped_base_transform, this.whipped_base);
        //
        // let whipped_middle_transform = model_transform.times(Mat4.translation(-8, 36.1, 2))
        //     .times(Mat4.scale(2.48, 2.48, 2.48))
        //     .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        // this.shape_middle.draw(context, program_state, whipped_middle_transform, this.whipped_middle);
        //
        // let whipped_top_transform = model_transform.times(Mat4.translation(-8, 35, 2))
        //     .times(Mat4.scale(1, 11, 1))
        //     .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
        // this.shape_top.draw(context, program_state, whipped_top_transform, this.whipped_top);


        this.frame += program_state.animation_delta_time;

        this.shape_base.draw(context, program_state, whipped_base_transform, this.whipped_base);
        this.shape_middle.draw(context, program_state, whipped_middle_transform, this.whipped_middle);
        this.shape_top.draw(context, program_state, whipped_top_transform, this.whipped_top);
    }
}
