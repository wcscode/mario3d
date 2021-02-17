const vector3d = (x, y, z) => { return {x, y, z} }; 
const triangle = (a, b, c) => { return {points:[a, b, c]} };
const mesh = () => {return {triangles:[]}};

const meshCube = mesh();

meshCube.triangles = [
    //front
    triangle(vector3d(0, 0, 0), vector3d(0, 1, 0), vector3d(1, 1, 0)),
    triangle(vector3d(0, 0, 0), vector3d(1, 1, 0), vector3d(1, 0, 0)),
    //back
    triangle(vector3d(0, 0, 0), vector3d(0, 1, 0), vector3d(1, 1, 0)),
    triangle(vector3d(0, 0, 0), vector3d(1, 1, 0), vector3d(1, 0, 0)),
    //top
    triangle(vector3d(0, 1, 0), vector3d(0, 1, 1), vector3d(1, 1, 1)),
    triangle(vector3d(0, 1, 0), vector3d(1, 1, 1), vector3d(1, 1, 0)),
    //bottom
    triangle(vector3d(0, 0, 0), vector3d(0, 0, 1), vector3d(1, 0, 1)),
    triangle(vector3d(0, 0, 0), vector3d(1, 0, 1), vector3d(1, 0, 0)),
    //left
    triangle(vector3d(0, 0, 0), vector3d(0, 1, 0), vector3d(0, 1, 1)),
    triangle(vector3d(0, 0, 0), vector3d(0, 1, 1), vector3d(0, 0, 1)),
    //right
    triangle(vector3d(1, 0, 0), vector3d(1, 1, 0), vector3d(1, 1, 1)),
    triangle(vector3d(1, 0, 0), vector3d(1, 1, 1), vector3d(1, 0, 1))

];

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//console.log(meshCube)
context.fillRect(0, 0, 800, 600);
context.translate(400, 300);
context.strokeStyle = 'white';


const matrixUniformScaling = (scale) => [

    [scale, 0, 0, 0],
    [0, scale, 0, 0],
    [0, 0, scale, 0],
    [0, 0, 0, 1]

];



const matrixRotationX = (angle) => [

    [1, 0, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle), 0],
    [0, Math.sin(angle), Math.cos(angle), 0],    
    [0, 0, 0, 1]

];

const matrixRotationY = (angle) => [

    [Math.cos(angle), -Math.sin(angle), 0, 0],
    [0, 1, 0, 0],
    [Math.sin(angle), Math.cos(angle), 0, 0],    
    [0, 0, 0, 1]

];

const matrixRotationZ = (angle) => [

    [Math.cos(angle), -Math.sin(angle), 0, 0],
    [Math.sin(angle), Math.cos(angle), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]

];
const multiplyMatrix = (vector, matrix) => {
  
    return {
        x: vector.x * matrix[0][0] + vector.y * matrix[0][1] + vector.z * matrix[0][2],
        y: vector.x * matrix[1][0] + vector.y * matrix[1][1] + vector.z * matrix[1][2],
        z: vector.x * matrix[2][0] + vector.y * matrix[2][1] + vector.z * matrix[2][2],        
    }
}

meshCube.triangles.forEach(triangle =>{

    const points = triangle.points.map(point => {

        
        const pointRotatedX =  multiplyMatrix(point, matrixRotationX(3));
        //const pointRotatedY =  multiplyMatrix(pointRotatedX, matrixRotationY(Math.PI / 4));
        //const pointRotatedZ =  multiplyMatrix(pointRotatedY, matrixRotationY(Math.PI / 4));
        const pointScaled = multiplyMatrix(pointRotatedX, matrixUniformScaling(100));
        const transformedPoint = pointScaled;

        return transformedPoint;
    })
    
    context.beginPath();
    console.log(points)
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.lineTo(points[1].x, points[1].y);
   // context.lineTo(points[0].x, points[0].y);
   
    context.closePath();
    context.stroke();

});



