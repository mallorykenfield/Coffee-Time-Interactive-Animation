import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

export class Sugarcubes {
    constructor(shape_milk, mat_sugar, milk_top) {
        this.frame = 0;
        this.shape_milk = shape_milk;
        this.mat_sugar = mat_sugar;
        this.milk_top = milk_top; // this won't be used, but constructor needed 3 parameters
    }

    start_animation() {
        // keeps track of when animation began
        this.frame = 0;
    }

    display(context, program_state, model_transform) {
        let p1_end = 1000;
        let p2_end = 1800;
        let p3_end = 2000;

        let sugar1_transform = model_transform;
        let sugar2_transform = model_transform;
        let sugar2_startframe = 60;
        let sugar3_transform = model_transform;
        let sugar3_startframe = 120;

        let y = 16;

        // animate marshmallow 1
        if (this.frame > p3_end) {
            let t = this.frame;
            let d = p1_end;
            let r = 0;
            sugar1_transform = model_transform.times(Mat4.translation(3, y, -14))
                .times(Mat4.scale(0.75, 0.75, 0.75))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            sugar1_transform = sugar1_transform.times(Mat4.translation(3, y, -14 * r));
        }
        else if (this.frame > p2_end) {
            let t = this.frame - p2_end;
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            sugar1_transform = model_transform.times(Mat4.translation(3, y, -14))
                .times(Mat4.scale(0.75, 0.75, 0.75))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            sugar1_transform = sugar1_transform.times(Mat4.translation(3, y, -14 * r));
        }

        // animate marshmallow 2
        if (this.frame > (p3_end + sugar2_startframe)) {
            let t = this.frame - (p3_end + sugar2_startframe);
            let d = p1_end;
            let r = 0;
            sugar2_transform = model_transform.times(Mat4.translation(5, y, -12))
                .times(Mat4.scale(0.75, 0.75, 0.75))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            sugar2_transform = sugar2_transform.times(Mat4.translation(5, y, -12 * r));
        }
        else if (this.frame > (p2_end + sugar2_startframe)) {
            let t = this.frame - (p2_end + sugar2_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            sugar2_transform = model_transform.times(Mat4.translation(5, y, -12))
                .times(Mat4.scale(0.75, 0.75, 0.75))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            sugar2_transform = sugar2_transform.times(Mat4.translation(5, y, -12 * r));
        }

        // animate marshmallow 3
        if (this.frame > (p3_end + sugar3_startframe)) {
            let t = this.frame - (p3_end + sugar3_startframe);
            let d = p1_end;
            let r = 0;
            sugar3_transform = model_transform.times(Mat4.translation(1, y, -10))
                .times(Mat4.scale(0.75, 0.75, 0.75))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            sugar3_transform = sugar3_transform.times(Mat4.translation(1, y, -10 * r));
        }
        else if (this.frame > (p2_end + sugar3_startframe)) {
            let t = this.frame - (p2_end + sugar3_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            sugar3_transform = model_transform.times(Mat4.translation(1, y, -10))
                .times(Mat4.scale(0.75, 0.75, 0.75))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            sugar3_transform = sugar3_transform.times(Mat4.translation(1, y, -10 * r));
        }

        this.frame += program_state.animation_delta_time;

        this.shape_milk.draw(context, program_state, sugar1_transform, this.mat_sugar);
        this.shape_milk.draw(context, program_state, sugar2_transform, this.mat_sugar);
        this.shape_milk.draw(context, program_state, sugar3_transform, this.mat_sugar);

    }
}
