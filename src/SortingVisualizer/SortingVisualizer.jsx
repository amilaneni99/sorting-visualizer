import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations, getBubbleSortAnimations, getQuickSortAnimations, getHeapSortAnimations} from '../algorithms/algorithms.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button, Navbar, Nav, Container, Col} from 'react-bootstrap';


const ANIMATION_SPEED_MS = 5;

const NUMBER_OF_ARRAY_BARS = 50;

const PRIMARY_COLOR = 'lightcoral';

const SECONDARY_COLOR = 'cornflowerblue';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        document.title = "Sorting Visualizer";
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            var maxH = window.innerHeight*0.78;
            array.push(randomIntFromInterval(5, maxH));
        }
        this.setState({ array });
    }

    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for(let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                    console.log(animations[i]+" "+barOneStyle.height);
                    
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort(){
        const animations = getBubbleSortAnimations(this.state.array);
        for(let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if(isColorChange){
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } 
            else {
                setTimeout(() => {
                    const [barOneIndex, barTwoIndex, newHeightOne, newHeightTwo] = animations[i]; 
                    arrayBars[barOneIndex].style.height = `${newHeightTwo}px`;
                    arrayBars[barTwoIndex].style.height = `${newHeightOne}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort(){
        console.log(this.state.array);
        const animations = getHeapSortAnimations(this.state.array);        
        
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIndex, barTwoIndex, newHeightOne, newHeightTwo] = animations[i];
                    arrayBars[barOneIndex].style.height = `${newHeightTwo}px`;
                    arrayBars[barTwoIndex].style.height = `${newHeightOne}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort(){
        // console.log(this.state.array);
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIndex, barTwoIndex, newHeightOne, newHeightTwo] = animations[i];
                    arrayBars[barOneIndex].style.height = `${newHeightTwo}px`;
                    arrayBars[barTwoIndex].style.height = `${newHeightOne}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const { array } = this.state;

        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="#home" className="fontFam">Sorting Visualizer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => {this.bubbleSort()}}>
                                <Button className="fontFam">Bubble Sort</Button>
                            </Nav.Link>
                            <Nav.Link onClick={() => {this.mergeSort()}}>
                                <Button className="fontFam">Merge Sort</Button>
                            </Nav.Link>
                            <Nav.Link onClick={() => { this.heapSort() }}>
                                <Button className="fontFam">Heap Sort</Button>
                            </Nav.Link>
                            <Nav.Link onClick={() => { this.quickSort() }}>
                                <Button className="fontFam">Quick Sort</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid>
                    <div className="array-container">
                        {array.map((value, idx) => (
                            <div
                                className="array-bar"
                                key={idx}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`,
                                }}>
                                </div>
                        ))}
                    </div>
                </Container>
                <Button className="fab fontFam" variant="primary" size="lg" onClick={() => this.resetArray()}>Reset Array</Button>
                <div style={{position: "absolute", bottom: "20px", width: "100%", margin:"auto"}}>
                    <h5 style={{marginBottom: 0}}>Made with <i id="love" className="fa fa-heart"></i> by <a href="https://www.linkedin.com/in/amilaneni-abhinav">Abhinav</a></h5>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}