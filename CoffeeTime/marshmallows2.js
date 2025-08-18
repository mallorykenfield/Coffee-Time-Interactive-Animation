import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

export class Marshmallows2 {
    constructor(shape_marsh, shape_cream, shape_base, shape_middle, shape_top, whipped_base, whipped_middle, whipped_top, mat_marsh, cream) {
        this.frame = 0;
        this.shape_marsh = shape_marsh;
        this.shape_cream = shape_cream;
        this.shape_base = shape_base;
        this.shape_middle = shape_middle;
        this.shape_top = shape_top;
        this.whipped_base = whipped_base;
        this.whipped_middle = whipped_middle;
        this.whipped_top = whipped_top;
        this.mat_marsh = mat_marsh;
        this.cream = cream;
    }

    start_animation() {
        // keeps track of when animation began
        this.frame = 0;
    }

    display(context, program_state, model_transform) {
        let p1_end = 1000;
        let p2_end = 1800;
        let p3_end = 3000;

        // building the cream
        let cream_transform1 = model_transform.times(Mat4.translation(5, 19.3, 2))
            //  .times(Mat4.scale(6.3, 4.5, 6.3))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0)).times(Mat4.scale(6.3, 6.3, 6.3));
        let cream_transform2 = model_transform.times(Mat4.translation(5, 21.3, 2))
            // .times(Mat4.scale(5, 4, 5))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0)).times(Mat4.scale(5, 5, 5));
        let cream_transform3 = model_transform.times(Mat4.translation(5, 23.3, 2))
            //.times(Mat4.scale(3.5, 3.5, 3.5))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0)).times(Mat4.scale(3.5, 3.5, 3.5));
        let cream_transform4 = model_transform.times(Mat4.translation(5, 24.5, 2))
            //.times(Mat4.scale(2, 3, 2))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0)).times(Mat4.scale(2, 3, 2));
        let cream_transform5 = model_transform.times(Mat4.translation(5, 25, 2))
            //.times(Mat4.scale(1, 2.5, 1))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0)).times(Mat4.scale(1, 2.5, 1));
        let cream_transform6 = model_transform.times(Mat4.translation(5, 25.2, 2))
            //.times(Mat4.scale(0.5, 2, 0.5))
            .times(Mat4.rotation(Math.PI/2, 1, 0, 0)).times(Mat4.scale(0.5, 1, 0.5));

        this.shape_cream.draw(context, program_state, cream_transform1, this.cream);
        this.shape_cream.draw(context, program_state, cream_transform2, this.cream);
        this.shape_cream.draw(context, program_state, cream_transform3, this.cream);
        this.shape_cream.draw(context, program_state, cream_transform4, this.cream);
        this.shape_cream.draw(context, program_state, cream_transform5, this.cream);
        this.shape_top.draw(context, program_state, cream_transform6, this.cream);
        
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

        // coords
        let x1 = 1.3;
        let y1 = 23.5;
        let z1 = -20;

        let x2 = 4;
        let y2 = 23.3;
        let z2 = -21.2;

        let x3 = 2.15;
        let y3 = 22.7;
        let z3= -24.5;

        let x4 = 2.2;
        let y4 = 22.3;
        let z4 = -16.5;

        let x5 = 3.5;
        let y5 = 20.6;
        let z5 = -14;

        let x6 = -0.13;
        let y6 = 20.8;
        let z6 = -18;


        // animate marshmallow 1
        if (this.frame > p3_end) {
            let t = this.frame;
            let d = p1_end;
            let r = 0;
            marshmallow1_transform = model_transform.times(Mat4.translation(x1, y1, z1))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow1_transform = marshmallow1_transform.times(Mat4.translation(x1, y1, z1 * r));
        }
        else if (this.frame > p2_end) {
            let t = this.frame - p2_end;
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow1_transform = model_transform.times(Mat4.translation(x1, y1, z1))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow1_transform = marshmallow1_transform.times(Mat4.translation(x1, y1, z1 * r));
        }

        // animate marshmallow 2
        if (this.frame > (p3_end + marshmallow2_startframe)) {
            let t = this.frame - (p3_end + marshmallow2_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow2_transform = model_transform.times(Mat4.translation(x2, y2, z2))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow2_transform = marshmallow2_transform.times(Mat4.translation(x2, y2, z2* r));
        }
        else if (this.frame > (p2_end + marshmallow2_startframe)) {
            let t = this.frame - (p2_end + marshmallow2_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow2_transform = model_transform.times(Mat4.translation(x2, y2, z2))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow2_transform = marshmallow2_transform.times(Mat4.translation(x2, y2, z2 * r));
        }

        // animate marshmallow 3
        if (this.frame > (p3_end + marshmallow3_startframe)) {
            let t = this.frame - (p3_end + marshmallow3_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow3_transform = model_transform.times(Mat4.translation(x3, y3, z3))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow3_transform = marshmallow3_transform.times(Mat4.translation(x3, y3, z3 * r));
        }
        else if (this.frame > (p2_end + marshmallow3_startframe)) {
            let t = this.frame - (p2_end + marshmallow3_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow3_transform = model_transform.times(Mat4.translation(x3, y3, z3))
                .times(Mat4.scale(1, 3, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow3_transform = marshmallow3_transform.times(Mat4.translation(x3, y3, z3 * r));
        }

        // animate marshmallow 4
        if (this.frame > (p3_end + marshmallow4_startframe)) {
            let t = this.frame - (p3_end + marshmallow4_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow4_transform = model_transform.times(Mat4.translation(x4, y4, z4))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow4_transform = marshmallow4_transform.times(Mat4.translation(x4, y4, z4 * r));
        }
        else if (this.frame > (p2_end + marshmallow4_startframe)) {
            let t = this.frame - (p2_end + marshmallow4_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow4_transform = model_transform.times(Mat4.translation(x4, y4, z4))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow4_transform = marshmallow4_transform.times(Mat4.translation(x4, y4, z4 * r));
        }

        // animate marshmallow 5
        if (this.frame > (p3_end + marshmallow5_startframe)) {
            let t = this.frame - (p3_end + marshmallow5_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow5_transform = model_transform.times(Mat4.translation(x5, y5, z5))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow5_transform = marshmallow5_transform.times(Mat4.translation(x5, y5, z5 * r));
        }
        else if (this.frame > (p2_end + marshmallow5_startframe)) {
            let t = this.frame - (p2_end + marshmallow5_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow5_transform = model_transform.times(Mat4.translation(x5, y5, z5))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow5_transform = marshmallow5_transform.times(Mat4.translation(x5, y5, z5 * r));
        }

        // animate marshmallow 6
        if (this.frame > (p3_end + marshmallow6_startframe)) {
            let t = this.frame - (p3_end + marshmallow6_startframe);
            let d = p1_end;
            let r = 0;
            marshmallow6_transform = model_transform.times(Mat4.translation(x6, y6, z6))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow6_transform = marshmallow6_transform.times(Mat4.translation(x6, y6, z6 * r));
        }
        else if (this.frame > (p2_end + marshmallow6_startframe)) {
            let t = this.frame - (p2_end + marshmallow6_startframe);
            let d = p3_end - p2_end;
            let r = t/d;
            r = 1.0 - r;
            marshmallow6_transform = model_transform.times(Mat4.translation(x6, y6, z6))
                .times(Mat4.scale(1, 2, 1))
                .times(Mat4.rotation(Math.PI/2, 1, 0, 0));
            marshmallow6_transform = marshmallow6_transform.times(Mat4.translation(x6, y6, z6 * r));
        }


        this.frame += program_state.animation_delta_time;

        this.shape_marsh.draw(context, program_state, marshmallow1_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow2_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow3_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow4_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow5_transform, this.mat_marsh);
        this.shape_marsh.draw(context, program_state, marshmallow6_transform, this.mat_marsh);

    }
}
