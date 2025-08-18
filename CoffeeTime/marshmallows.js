import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

export class Marshmallows {
    constructor(shape_marsh, mat_marsh, milk_top) {
        this.frame = 0;
        this.shape_marsh = shape_marsh;
        this.mat_marsh = mat_marsh;
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
        // starting point
        let a_x = 1;
        let a_y = 18;
        let a_z = -13;
        // offset from start
        let b_y = 5;

        let t_x = 1;
        let t_y = 0.195;
        let t_z = 0.146;

        let marshmallow1_transform = model_transform;
        let marshmallow2_transform = model_transform;
        let marshmallow2_startframe = 60;
        let marshmallow3_transform = model_transform;
        let marshmallow3_startframe = 120;
        let marshmallow4_transform = model_transform;
        let marshmallow4_startframe = 180;
        let marshmallow5_transform = model_transform;
        let marshmallow5_startframe = 240;
        let marshmallow6_transform = model_transform;
        let marshmallow6_startframe = 300;
        let marshmallow7_transform = model_transform;
        let marshmallow7_startframe = 360;

        // animate marshmallow 1
        if (this.frame > p3_end) {
            let t = this.frame;
            let d = p1_end;
            let r = 0;
            marshmallow1_transform = model_transform.times(Mat4.translation(1, 18, -13.5))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow1_transform = marshmallow1_transform.times(Mat4.translation(1, 18, -13.5 * r));
        }
        else if (this.frame > p2_end) {
            let t = this.frame - p2_end;
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow1_transform = model_transform.times(Mat4.translation(1, 18, -13.5))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow1_transform = marshmallow1_transform.times(Mat4.translation(1, 18, -13.5 * r));
        }

        // animate marshmallow 2
        if (this.frame > (p3_end + marshmallow2_startframe)) {
            let t = this.frame - (p3_end + marshmallow2_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow2_transform = model_transform.times(Mat4.translation(1.3, 18, -20))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow2_transform = marshmallow2_transform.times(Mat4.translation(1.3, 18, -20 * r));
        }
        else if (this.frame > (p2_end + marshmallow2_startframe)) {
            let t = this.frame - (p2_end + marshmallow2_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow2_transform = model_transform.times(Mat4.translation(1.3, 18, -20))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow2_transform = marshmallow2_transform.times(Mat4.translation(1.3, 18, -20 * r));
        }

        // animate marshmallow 3
        if (this.frame > (p3_end + marshmallow3_startframe)) {
            let t = this.frame - (p3_end + marshmallow3_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow3_transform = model_transform.times(Mat4.translation(2, 18, -18))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow3_transform = marshmallow3_transform.times(Mat4.translation(2, 18, -18 * r));
        }
        else if (this.frame > (p2_end + marshmallow3_startframe)) {
            let t = this.frame - (p2_end + marshmallow3_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow3_transform = model_transform.times(Mat4.translation(2, 18, -18))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow3_transform = marshmallow3_transform.times(Mat4.translation(2, 18, -18 * r));
        }

        // animate marshmallow 4
        if (this.frame > (p3_end + marshmallow4_startframe)) {
            let t = this.frame - (p3_end + marshmallow4_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow4_transform = model_transform.times(Mat4.translation(3.6, 18, -15.7))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow4_transform = marshmallow4_transform.times(Mat4.translation(3.6, 18, -15.7 * r));
        }
        else if (this.frame > (p2_end + marshmallow4_startframe)) {
            let t = this.frame - (p2_end + marshmallow4_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow4_transform = model_transform.times(Mat4.translation(3.6, 18, -15.7))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow4_transform = marshmallow4_transform.times(Mat4.translation(3.6, 18, -15.7 * r));
        }

        // animate marshmallow 5
        if (this.frame > (p3_end + marshmallow5_startframe)) {
            let t = this.frame - (p3_end + marshmallow5_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow5_transform = model_transform.times(Mat4.translation(4.7, 18, -17.6))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow5_transform = marshmallow5_transform.times(Mat4.translation(4.7, 18, -17.6 * r));
        }
        else if (this.frame > (p2_end + marshmallow5_startframe)) {
            let t = this.frame - (p2_end + marshmallow5_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow5_transform = model_transform.times(Mat4.translation(4.7, 18, -17.6))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow5_transform = marshmallow5_transform.times(Mat4.translation(4.7, 18, -17.6 * r));
        }

        // animate marshmallow 6
        if (this.frame > (p3_end + marshmallow6_startframe)) {
            let t = this.frame - (p3_end + marshmallow6_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow6_transform = model_transform.times(Mat4.translation(1.5, 18, -11.5))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow6_transform = marshmallow6_transform.times(Mat4.translation(1.5, 18, -11.5 * r));
        }
        else if (this.frame > (p2_end + marshmallow6_startframe)) {
            let t = this.frame - (p2_end + marshmallow6_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow6_transform = model_transform.times(Mat4.translation(1.5, 18, -11.5))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow6_transform = marshmallow6_transform.times(Mat4.translation(1.5, 18, -11.5 * r));
        }
        // animate marshmallow 7
        if (this.frame > (p3_end + marshmallow7_startframe)) {
            let t = this.frame - (p3_end + marshmallow7_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow7_transform = model_transform.times(Mat4.translation(4.7, 18, -13))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow7_transform = marshmallow7_transform.times(Mat4.translation(4.7, 18, -13 * r));
        }
        else if (this.frame > (p2_end + marshmallow7_startframe)) {
            let t = this.frame - (p2_end + marshmallow7_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow7_transform = model_transform.times(Mat4.translation(4.7, 18, -13))
                .times(Mat4.scale(1, 1, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow7_transform = marshmallow7_transform.times(Mat4.translation(4.7, 18, -13 * r));
        }


        this.frame += program_state.animation_delta_time;

        this.shape_marsh.draw(context, program_state, marshmallow1_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow2_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow3_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow4_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow5_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow6_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow7_transform, this.mat_marsh);

    }
}
