import {defs, tiny} from './examples/common.js';
import { Simulation } from './examples/control-demo.js';
import {CoffeeModel} from './model.js';
import {MilkCarton} from './milk.js';
import {WhippedCream} from './whippedcream.js';
import {Marshmallows} from "./marshmallows.js";
import {Marshmallows2} from "./marshmallows2.js";
import {Sugarcubes} from "./sugarcubes.js";


// Pull these names into this module's scope for convenience:
const {Vector, vec3, vec4, vec, color, Matrix, Mat4, Light, Shape, Material, hex_color, Shader, Texture, Scene} = tiny;
const {Cube, Cylindrical_Tube, Capped_Cylinder, Torus, Rounded_Capped_Cylinder, Textured_Phong, Phong_Shader, Basic_Shader, Subdivision_Sphere} = defs

import {Color_Phong_Shader, Shadow_Textured_Phong_Shader,
    Depth_Texture_Shader_2D, Buffered_Texture, LIGHT_DEPTH_TEX_SIZE} from './examples/shadow-demo-shaders.js';


// The scene (Shadow_Demo)
export class Build_Your_Coffee extends Simulation {
    constructor() {
        super();

        this.model = new CoffeeModel();

        // Load the model file:
        this.shapes = {
            "cube": new Cube(),
            room: new Cube(),
            table: new Cube(),
            mug: new Cylindrical_Tube(10, 12),
            handle: new defs.Torus(15, 15),
            cup: new Cylindrical_Tube(10, 15),
            coffee: new Capped_Cylinder(10,15),
            ice: new Cube(),
            marshmallow: new Capped_Cylinder(8, 10),
            milk: new Cube(),
            whipped_base: new Capped_Cylinder(10, 20),
            whipped_middle: new Subdivision_Sphere(4),
            whipped_top: new Rounded_Capped_Cylinder(10, 20),
            cream: new Torus(15, 15),
            cinnamon: new Capped_Cylinder(8, 10),
        };
        this.shapes.cup.arrays.texture_coord.forEach(p => p.scale_by(0.2));
        this.shapes.mug.arrays.texture_coord.forEach(p => p.scale_by(0.25));
        this.shapes.cinnamon.arrays.texture_coord.forEach(p => p.scale_by(0.2));
        this.shapes.cream.arrays.texture_coord.forEach(p => p.scale_by(0.055));
        this.shapes.whipped_base.arrays.texture_coord.forEach(p => p.scale_by(0.05));
        this.shapes.marshmallow.arrays.texture_coord.forEach(p => p.scale_by(0.2));


        this.walls = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1),
            ambient: .3, diffusivity: 2, specularity: 0.7,
            color_texture: new Texture("assets/window copy.jpg"),
            light_depth_texture: null

        });

        this.floor = new Material(new Textured_Phong(), {
            ambient: 0.6, diffusivity: 0.1, specularity: 0.1,
            texture: new Texture("assets/tile floor.jpg", "LINEAR_MIPMAP_LINEAR")
        });

        this.table = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1),
            ambient: .3, diffusivity: 2, specularity: 0.7,
            color_texture: new Texture("assets/Wood2 copy.jpg"),
            light_depth_texture: null
        });
        // For the first pass
        this.pure = new Material(new Color_Phong_Shader(), {
        });
        // For light source
        this.light_src = new Material(new Phong_Shader(), {
            color: color(1, 1, 1, 1), ambient: 1, diffusivity: 0, specularity: 0
        });
        // For depth texture display
        this.depth_tex =  new Material(new Depth_Texture_Shader_2D(), {
            color: color(0, 0, .0, 1),
            ambient: 1, diffusivity: 0, specularity: 0, texture: null
        });
        this.test = new Material(new Phong_Shader(), {
            color: hex_color("#ffffff"), ambient: 0.8, diffusivity: 1,
            });
        this.mug_material = new Material(new defs.Phong_Shader(), {
            ambient: 0.8, diffusivity: 1, color: hex_color("#fffdde")
        });
        this.mug1_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1), ambient: 0.5, diffusivity: 0.5, specularity: 0.5,
            color_texture: new Texture("assets/sun-min-min.png"),
            light_depth_texture: null
        });
        this.mug2_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1), ambient: 0.5, diffusivity: 0.5, specularity: 0.5,
            color_texture: new Texture("assets/plaid.png"),
            light_depth_texture: null
        });
        this.cup_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1), ambient: 0.5, diffusivity: 0.5, specularity: 0.5,
            color_texture: new Texture("assets/glass.png"),
            light_depth_texture: null
        });
        this.straw1_material = new Material(new Textured_Phong(), {
            ambient: 0.8, diffusivity: 0.8, specularity: 1,
            texture: new Texture("assets/straw 1.png", "NEAREST")
        });
        this.straw2_material = new Material(new Textured_Phong(), {
            ambient: 0.8, diffusivity: 0.8, specularity: 1,
            texture: new Texture("assets/straw 2.png", "LINEAR_MIPMAP_LINEAR")
        });
        this.ice_material = new Material(new Textured_Phong(), {
            ambient: 0.8, diffusivity: 0.8, specularity: 1,
            texture: new Texture("assets/ice.jpg", "LINEAR_MIPMAP_LINEAR")
        });
        this.milk_base_material = new Material(new Textured_Phong(), {
            ambient: 0.8, diffusivity: 0.8, specularity: 1,
            texture: new Texture("assets/milk.png", "LINEAR_MIPMAP_LINEAR")
        });
        this.milk_top_material = new Material(new defs.Phong_Shader(), {
            ambient: 0.8, diffusivity: 1, color: hex_color("#faf6eb")
        });
        this.sugar_material =  new Material(new Textured_Phong(), {
            ambient: 0.8, diffusivity: 0.8, specularity: 1,
            texture: new Texture("assets/sugar.jpeg", "LINEAR_MIPMAP_LINEAR")
        });
        this.whipped_base_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1), ambient: 0.5, diffusivity: 0.5, specularity: 0.5,
            color_texture: new Texture("assets/whipped_stripes.jpeg"),
            light_depth_texture: null
        });
        this.whipped_middle_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            ambient: 0.8, diffusivity: 1, color: hex_color("#6e7275"),
            color_texture: null,
            light_depth_texture: null
        });
        this.whipped_top_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            ambient: 0.8, diffusivity: 1, color: hex_color("#fe4e74"),
            color_texture: null,
            light_depth_texture: null
        });
        this.cream_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1), ambient: 0.5, diffusivity: 0.5, specularity: 0.5,
            color_texture: new Texture("assets/whipped.jpeg"),
            light_depth_texture: null
        });
        this.marshmallow_material = new Material(new defs.Phong_Shader(), {
            ambient: 0.8, diffusivity: 1, color: hex_color("#f5faf6")
        });
        this.cinnamon_material = new Material(new Shadow_Textured_Phong_Shader(1), {
            color: color(.5, .5, .5, 1), ambient: 0.5, diffusivity: 0.5, specularity: 0.5,
            color_texture: new Texture("assets/cinnamon.jpeg"),
            light_depth_texture: null
        });

        // To make sure texture initialization only does once
        this.init_ok = false;

        this.milk = new MilkCarton(this.shapes.milk, this.milk_base_material, this.milk_top_material);
        this.whipped_cream = new WhippedCream(this.shapes.whipped_base, this.shapes.whipped_middle, this.shapes.whipped_top, this.shapes.cream, this.whipped_base_material, this.whipped_middle_material, this.whipped_top_material, this.cream_material);
        this.marshmallow = new Marshmallows(this.shapes.marshmallow, this.marshmallow_material, this.milk_top_material);
        this.marshmallow2 = new Marshmallows2(this.shapes.marshmallow, this.shapes.cream, this.shapes.whipped_base, this.shapes.whipped_middle, this.shapes.whipped_top, this.whipped_base_material, this.whipped_middle_material, this.whipped_top_material, this.marshmallow_material, this.cream_material);
        this.sugar = new Sugarcubes(this.shapes.milk, this.sugar_material, this.milk_top_material);

        this.initial_camera_location = Mat4.look_at(vec3(0, 10, 20), vec3(0, 0, 0), vec3(0, 1, 0));

    }

    make_control_panel() {

        this.live_string(box => box.textContent = "1) Choose coffee temperature: ");
        this.new_line();
        this.key_triggered_button("iced coffee", ["i"],() => {
            this.model.make_iced();
        });
        this.key_triggered_button("hot coffee", ["h"],() => {
            this.model.make_hot();
        });
        this.new_line();
        this.new_line();
        this.live_string(box => {
            box.textContent = "a) If you chose a hot coffee: "
            box.style.marginLeft = "20px";
        });
        this.new_line();
        this.live_string(box => {
            box.textContent = "• choose your mug:";
            box.style.marginLeft = "35px";  // indent visually
        });
        this.new_line();
        this.live_string(box => {
            box.textContent = " ";
            box.style.marginLeft = "35px";  // indent visually
        });
        this.key_triggered_button("mug 1", ["1"],() => {
            this.model.pick_mug1();
        });
        this.key_triggered_button("mug 2", ["2"],() => {
            this.model.pick_mug2();
        });
        this.new_line();
        this.live_string(box => {
            box.textContent = "b) If you chose an iced coffee: "
            box.style.marginLeft = "20px";
        });
        this.new_line();
        this.live_string(box => {
            box.textContent = "• choose your straw:";
            box.style.marginLeft = "35px";  // indent visually
        });
        this.new_line();
        this.live_string(box => {
            box.textContent = " ";
            box.style.marginLeft = "35px";  // indent visually
        });
        this.key_triggered_button("straw 1", ["3"],() => {
            this.model.add_straw1();
        });
        this.key_triggered_button("straw 2", ["4"],() => {
            this.model.add_straw2();
        });
        this.new_line();
        this.new_line();
        this.live_string(box => box.textContent = "2) Choose coffee roast: ");
        this.new_line();
        this.key_triggered_button("dark roast", ["d"],() => {
            this.model.pick_dark();
        });
        this.key_triggered_button("light roast", ["l"],() => {
            this.model.pick_light();
        });
        this.new_line();
        this.new_line();
        this.live_string(box => box.textContent = "3) Choose additives: ");
        this.new_line();
        this.key_triggered_button("milk", ["m"],() => {
            this.model.toggle_milk();
            this.milk.start_animation();
        });
        this.key_triggered_button("sugar", ["s"],() => {
            this.model.toggle_sugar();
            this.sugar.start_animation();
        });
        this.key_triggered_button("whipped cream", ["w"],() => {
            this.model.toggle_whipped();
            this.whipped_cream.start_animation();
        });
        this.key_triggered_button("marshmallows", ["a"],() => {
            this.model.toggle_marshmallows();
            this.marshmallow.start_animation();
            this.marshmallow2.start_animation();
        });
        this.key_triggered_button("cinnamon stick", ["c"],() => {
            this.model.toggle_cinnamon();
        });
        this.new_line();
        this.new_line();
        this.live_string(box => box.textContent = "Click this to view your drink from above: ");

        // Store a flag for which view is currently active
        this.showing_top = false;  // initially false = front view

        this.key_triggered_button("Look Inside", ["o"], () => {
            if (this.showing_top) {
                // Switch back to front view
                this.attached = null;  // or a function returning front view
            } else {
                // Switch to top view
                this.attached = () => this.top_view;
            }
            this.showing_top = !this.showing_top;  // flip the flag
        });

    }

    texture_buffer_init(gl) {
        // Depth Texture
        this.lightDepthTexture = gl.createTexture();
        // Bind it to TinyGraphics
        this.light_depth_texture = new Buffered_Texture(this.lightDepthTexture);
        this.walls.light_depth_texture = this.light_depth_texture
        this.floor.light_depth_texture = this.light_depth_texture

        this.lightDepthTextureSize = LIGHT_DEPTH_TEX_SIZE;
        gl.bindTexture(gl.TEXTURE_2D, this.lightDepthTexture);
        gl.texImage2D(
            gl.TEXTURE_2D,      // target
            0,                  // mip level
            gl.DEPTH_COMPONENT, // internal format
            this.lightDepthTextureSize,   // width
            this.lightDepthTextureSize,   // height
            0,                  // border
            gl.DEPTH_COMPONENT, // format
            gl.UNSIGNED_INT,    // type
            null);              // data
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Depth Texture Buffer
        this.lightDepthFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.lightDepthFramebuffer);
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,       // target
            gl.DEPTH_ATTACHMENT,  // attachment point
            gl.TEXTURE_2D,        // texture target
            this.lightDepthTexture,         // texture
            0);                   // mip level
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // create a color texture of the same size as the depth texture
        // see article why this is needed_
        this.unusedTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.unusedTexture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            this.lightDepthTextureSize,
            this.lightDepthTextureSize,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null,
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // attach it to the framebuffer
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,        // target
            gl.COLOR_ATTACHMENT0,  // attachment point
            gl.TEXTURE_2D,         // texture target
            this.unusedTexture,         // texture
            0);                    // mip level
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    render_scene(context, program_state, shadow_pass, draw_light_source=false, draw_shadow=false) {
        // shadow_pass: true if this is the second pass that draw the shadow.
        // draw_light_source: true if we want to draw the light source.
        // draw_shadow: true if we want to draw the shadow

        let light_position = this.light_position;
        let light_color = this.light_color;
        const t = program_state.animation_time;
        let model_transform = Mat4.identity();

        program_state.draw_shadow = draw_shadow;


        let model_trans_wall_1 = Mat4.translation(-51, 25, 30).times(Mat4.scale(1, 33, 45));
        let model_trans_wall_2 = Mat4.translation(51, 25, 30).times(Mat4.scale(1, 33, 45));
        let model_trans_wall_3 = Mat4.translation(0, 25, -14).times(Mat4.scale(50, 33, 1));
        let model_trans_wall_4 = Mat4.translation(0, 56, 30).times(Mat4.scale(50, 1, 45));
        let model_trans_wall_5 = Mat4.translation(0, -10, 30).times(Mat4.scale(50, 1, 45));


        let table_transform = model_transform.times(Mat4.scale(50, 2, 14))
            .times(Mat4.translation(0, 0, -0.2));

        this.shapes.cube.draw(context, program_state, table_transform, shadow_pass? this.table : this.pure);
        //left wall
        this.shapes.cube.draw(context, program_state, model_trans_wall_1, shadow_pass? this.walls : this.pure);
        //right wall
        this.shapes.cube.draw(context, program_state, model_trans_wall_2, shadow_pass? this.walls : this.pure);
       //back wall
        this.shapes.cube.draw(context, program_state, model_trans_wall_3, shadow_pass? this.walls : this.pure);
        //roof
        this.shapes.cube.draw(context, program_state, model_trans_wall_4, shadow_pass? this.walls : this.pure);
        //floor
        this.shapes.cube.draw(context, program_state, model_trans_wall_5, shadow_pass? this.floor : this.pure);

        //build hot coffee
        if (this.model.hot){
            let mug_transform = model_transform.times(Mat4.translation(5, 11, 2))
                .times(Mat4.scale(6.5,20,6.5))
                .times(Mat4.rotation(Math.PI/2,1,0,0));
            let handle_transform = model_transform.times(Mat4.rotation(0, 0, 1, 0))
                .times(Mat4.translation(13, 11, 2))
                .times(Mat4.scale(6, 6, 2));

            //selecting mugs
            if (this.model.mug0) {
                this.shapes.mug.draw(context, program_state, mug_transform, shadow_pass? this.mug_material : this.pure);
                this.shapes.handle.draw(context, program_state, handle_transform, shadow_pass? this.mug_material : this.pure);
            }
            if (this.model.mug1){
                this.shapes.mug.draw(context, program_state, mug_transform, shadow_pass? this.mug1_material : this.pure);
                let mugColor = hex_color("#f28b2d");
                this.shapes.handle.draw(context, program_state, handle_transform, shadow_pass? this.test.override(mugColor) : this.pure);
            }
            if (this.model.mug2){
                this.shapes.mug.draw(context, program_state, mug_transform, shadow_pass? this.mug2_material : this.pure);
                let mugColor = hex_color("#0e3968");
                this.shapes.handle.draw(context, program_state, handle_transform, shadow_pass? this.test.override(mugColor) : this.pure);
            }

            // build coffee
            if (this.model.dark_roast) {
                let hotCoffee_transform = model_transform.times(Mat4.translation(5, 10, 2))
                    .times(Mat4.scale(6.0,16,6.0))
                    .times(Mat4.rotation(Math.PI/2,1,0,0));
                this.shapes.coffee.draw(context, program_state, hotCoffee_transform, shadow_pass? this.test.override(this.model.shade) : this.pure);
            }
            if (this.model.light_roast) {
                let hotCoffee_transform = model_transform.times(Mat4.translation(5, 10, 2))
                    .times(Mat4.scale(6.0,16,6.0))
                    .times(Mat4.rotation(Math.PI/2,1,0,0));
                this.shapes.coffee.draw(context, program_state, hotCoffee_transform, shadow_pass? this.test.override(this.model.shade) : this.pure);
            }
        }

        //build iced coffee
        if (this.model.iced){

            //build iced coffee cup
            let cup_transform = model_transform.times(Mat4.translation(5, 11, 2)).times(Mat4.scale(6.5,20,6.5))
                .times(Mat4.rotation(Math.PI/2,1,0,0));
            let straw_transform = model_transform.times(Mat4.rotation(-0.24,0,0,1)).times(Mat4.translation(5, 12, 2))
                .times(Mat4.scale(0.75,38,0.75))
                .times(Mat4.rotation(Math.PI/2,1,0,0));

            this.shapes.cup.draw(context, program_state, cup_transform, shadow_pass? this.cup_material : this.pure);

            //build straw
            if (this.model.straw1){
                this.shapes.cup.draw(context, program_state, straw_transform, shadow_pass? this.straw1_material : this.pure);
            //console.log("test");
            }
            if (this.model.straw2) {
                this.shapes.cup.draw(context, program_state, straw_transform, shadow_pass? this.straw2_material : this.pure);
            }

            //build coffee
            let coffeeColor = this.model.shade;

            let coffee_transform = model_transform.times(Mat4.translation(5, 10, 2)).times(Mat4.scale(6.4,15,6.4))
                .times(Mat4.rotation(Math.PI/2,1,0,0));
            this.shapes.coffee.draw(context, program_state, coffee_transform, shadow_pass? this.test.override(coffeeColor) : this.pure);

            if (this.model.dark_roast || this.model.light_roast) {
                //build ice cubes
                let ice_transform1 = model_transform.times(Mat4.translation(1, 17, 2)).times(Mat4.scale(1.5, 1.5, 1.5).times(Mat4.rotation(5,0,1,0)));
                let ice_transform2 = model_transform.times(Mat4.translation(6, 17.8, 5)).times(Mat4.scale(1.5, 1.5, 1.5));
                let ice_transform3 = model_transform.times(Mat4.translation(7, 17, -1.3)).times(Mat4.scale(1.5, 1.5, 1.5).times(Mat4.rotation(3,0,1,0)));

                this.shapes.ice.draw(context, program_state, ice_transform1, shadow_pass? this.ice_material : this.pure);
                this.shapes.ice.draw(context, program_state, ice_transform2, shadow_pass? this.ice_material : this.pure);
                this.shapes.ice.draw(context, program_state, ice_transform3, shadow_pass? this.ice_material : this.pure);
            }
        }

        // build milk
        if (this.model.milk) {
            this.milk.display(context, program_state, model_transform);
        }

        // build sugar
        if (this.model.sugar) {
            this.sugar.display(context, program_state, model_transform);
        }

        // build whipped cream
        if (this.model.whipped_cream && !this.model.marshmallow) {
            this.whipped_cream.display(context, program_state, model_transform);
        }

        // build marshmallows
        if (this.model.marshmallow && !this.model.whipped_cream) {
            this.marshmallow.display(context, program_state, model_transform);
            //this.marshmallow2.display(context, program_state, model_transform);
        }

        if (this.model.whipped_cream && this.model.marshmallow) {
            this.marshmallow2.display(context, program_state, model_transform);
        }

        // build cinnamon stick
        if (this.model.cinnamon) {
            let cinnamon_transform1 = model_transform.times(Mat4.rotation(0.24, 0, 0, 1))
                .times(Mat4.translation(5.6, 15, -1.8))
                .times(Mat4.scale(0.5, 20, 0.5))
                .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
            let cinnamon_transform2 = model_transform.times(Mat4.rotation(0.24, 0, 0, 1))
                .times(Mat4.translation(5.2, 15, -1.2))
                .times(Mat4.scale(0.5, 20, 0.5))
                .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
            this.shapes.cinnamon.draw(context, program_state, cinnamon_transform1, shadow_pass? this.cinnamon_material : this.pure);
            this.shapes.cinnamon.draw(context, program_state, cinnamon_transform2, shadow_pass? this.cinnamon_material : this.pure);
        }
    }


    display(context, program_state, shadow_pass, draw_light_source=false, draw_shadow=false) {
        const t = program_state.animation_time;
        const gl = context.context;

        if (!this.init_ok) {
            const ext = gl.getExtension('WEBGL_depth_texture');
            if (!ext) {
                return alert('need WEBGL_depth_texture');  // eslint-disable-line
            }
            this.texture_buffer_init(gl);
            this.init_ok = true;
        }

        let desired;
        this.top_view = Mat4.translation(4.15,43,2);

        if (this.attached && this.attached() !== null) {
            desired = Mat4.inverse(this.attached().times(Mat4.rotation(-Math.PI/2, 1, 0, 0)));
        } else {
            desired = Mat4.translation(0, -27, -70);
        }
        program_state.set_camera(desired.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, 0.1)));


        // The position of the light
        this.light_position = vec4(-15, 40, 5, 1);
        // The color of the light
        this.light_color = color(1, 0.6, 0, 1);

        // This is a rough target of the light.
        // Although the light is point light, we need a target to set the POV of the light
        //  this.light_view_target = vec4(0, 0, 0, 1);
        //this.light_view_target = vec4(0, 0, 0, 1);
        this.light_view_target = vec4(0, -27, -70, 1);

        this.light_field_of_view = 130 * Math.PI / 180; // 130 degree

        program_state.lights = [new Light(this.light_position, this.light_color, 1000)];

        // Step 1: set the perspective and camera to the POV of light
        const light_view_mat = Mat4.look_at(
            vec3(this.light_position[0], this.light_position[1], this.light_position[2]),
            vec3(this.light_view_target[0], this.light_view_target[1], this.light_view_target[2]),
            vec3(0, 1, 0), // assume the light to target will have a up dir of +y, maybe need to change according to your case
        );
        const light_proj_mat = Mat4.perspective(this.light_field_of_view, 1, 0.5, 500);
        // Bind the Depth Texture Buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.lightDepthFramebuffer);
        gl.viewport(0, 0, this.lightDepthTextureSize, this.lightDepthTextureSize);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // Prepare uniforms
        program_state.light_view_mat = light_view_mat;
        program_state.light_proj_mat = light_proj_mat;
        program_state.light_tex_mat = light_proj_mat;
        program_state.view_mat = light_view_mat;
        program_state.projection_transform = light_proj_mat;
        this.render_scene(context, program_state, false, false, false);

        // Step 2: unbind, draw to the canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        program_state.view_mat = program_state.camera_inverse;
        program_state.projection_transform = Mat4.perspective(Math.PI / 4, context.width / context.height, 0.5, 500);
        this.render_scene(context, program_state, true, true, true);

    }

    show_explanation(document_element) {
        document_element.innerHTML += "<h1>Coffee Time! </h1>"
            +"<p> Good Morning! Make yourself a nice cup of coffee and enjoy this beautiful beach sunrise."
              }
}

