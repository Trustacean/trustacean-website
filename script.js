window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineWidth = 25;
    ctx.lineCap = 'round';


    class Fractal {
        constructor() {
            this.size = window.innerWidth / 2 - 200;
            this.sides = 6;
            this.maxLevel = 2;
            this.scale = 0.5;
            this.spread = 0.2;
            this.branches = 2;
            this.angle = 0;
            this.red = 0;
            this.green = 255;
            this.blue = 255;
            this.color = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        }

        draw() {
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.beginPath();
            ctx.rotate(this.angle / 4)
            for (let i = 0; i < this.sides; i++) {
                ctx.rotate((Math.PI * 2) / this.sides);
                this.drawBranch(0);
            }
            ctx.restore();
        }

        drawBranch(level) {
            if (level > this.maxLevel) return;
            ctx.beginPath();
            ctx.moveTo(this.size, 0);
            ctx.lineTo(this.size, 0);
            ctx.stroke();

            for (let i = 0; i < this.branches; i++) {
                ctx.save();
                ctx.translate((this.size / this.branches) * i, 0);
                ctx.rotate(this.spread);
                ctx.scale(this.scale, this.scale);
                this.drawBranch(level + 1);
                ctx.restore();

                ctx.save();
                ctx.translate((this.size / this.branches) * i, 0);
                ctx.rotate(-this.spread);
                ctx.scale(this.scale, this.scale);
                this.drawBranch(level + 1);
                ctx.restore();
            }
        }

        update() {
            this.spread = Math.tan(this.angle) * 0.3 * Math.sin(this.angle);
            this.angle += 0.01;
            this.scale = 0.35 + Math.sin(this.angle) * 0.2;
            this.red = 191 + Math.cos(this.angle) * 64;
            this.green = 191 + Math.sin(this.angle) * 64;
            this.color = `rgb(${this.red}, ${this.green}, ${this.blue})`;
            this.draw();
        }
    }

    const fractal = new Fractal();
    fractal.draw();


    function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
        fractal.update();
    }

    animate();

});