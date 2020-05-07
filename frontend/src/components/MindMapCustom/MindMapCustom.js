import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

import styles from '../../styles/variables.scss';

import './MindMapCustom.scss';


let dataGeneral = {
    name: 'Full Stack Software Engineer',
    children: [
        {
            name: 'Algorithms',
            children: [
                {
                    name: 'Algorithm analysis',
                    children: [
                        {name: 'Formal vs empirical'},
                        {name: 'Execution efficiency'}
                    ],
                },
                {
                    name: 'Optimization problems',
                    children: [
                        {name: 'Linear programming'},
                        {name: 'Dynamic programming'},
                        {name: 'The greedy method'},
                        {name: 'The heuristic method'},
                        {name: 'By field of study'},
                        {
                            name: 'By complexity',
                            children: [
                                {name: 'Constant time'},
                                {name: 'Logarithmic time'},
                                {name: 'Linear time'},
                                {name: 'Polynomial time'},
                                {name: 'Exponential time'}
                            ]
                        }
                    ],
                },
                {
                    name: 'Classification',
                    children: [
                        {
                            name: 'By implementation',
                            children: [
                                {name: 'Recursion'},
                                {name: 'Logical'},
                                {name: 'Serial, parallel or distributed'},
                                {name: 'Deterministic or non-deterministic'},
                                {name: 'Exact or approximate'},
                            ],
                        },
                        {
                            name: 'By design paradigm',
                            children: [
                                {name: 'Brute-force'},
                                {name: 'Divide and conquer'},
                                {name: 'Search and enumeration'},
                                {name: 'Randomized algorithm'},
                                {name: 'Reduction of complexity'},
                                {name: 'Back tracking'}
                            ],
                        }
                    ]
                },
                {
                    name: 'Algorithms',
                    children: [
                        {name: "Dijkstra's algorithm"},
                        {name: "Floyd–Warshall algorithm"},
                        {name: "Bellman–Ford algorithm"},
                        {name: "A*"},
                        {name: "Backtracking"},
                        {name: "Breadth-first search"},
                        {name: "Depth-first search"},
                        {name: "Binary search"},
                        {name: "Merge sort"},
                        {name: "Quick sort"},
                        {name: "Fibonacci search"},
                        {name: 'Bubble sort'},
                        {name: 'Longest common subsequence problem'},
                        {name: 'Longest increasing subsequence problem'},
                        {name: 'Shortest common supersequence problem'},
                        {name: 'Voronoi diagrams'},
                        {name: 'Binary GCD algorithm'},
                        {name: 'etc... https://en.wikipedia.org/wiki/List_of_algorithms'}
                    ]
                },
            ]
        },
        {
            name: 'Frontend',
            children: [
                {
                    name: 'Essentials',
                    children: [
                        {name: 'Javascript'},
                        {name: 'Web-Assembly'},
                        {
                            name: 'CSS',
                            children: [
                                {name: 'SCSS'},
                                {name: 'SASS'}
                            ]
                        },
                        {name: 'HTML'},
                        {name: 'Markdown'},
                        {name: 'Latex'}
                    ]
                },
                {
                    name: 'Frameworks',
                    children: [
                        {name: 'Angular'},
                        {name: 'React'},
                        {name: 'Vue'}
                    ]
                }
            ]
        },
        {
            name: 'Backend',
            children: [
                {
                    name: 'Programming languages',
                    children: [
                        {name: 'Python'},
                        {name: 'C/C++'},
                        {name: 'Ruby'},
                        {name: 'Java'},
                        {name: 'C#'},
                        {name: 'Perl'}
                    ]
                },
                {
                    name: 'Frameworks',
                    children: [
                        {name: 'Django'},
                        {name: 'Mojolicious'},
                        {name: 'Flask'},
                        {name: 'Scrapy'}
                    ]
                },
                {
                    name: 'Databases',
                    children: [
                        {name: 'MySQL'},
                        {name: 'PostgreSQL'},
                        {name: 'MongoDB'},
                        {name: 'MariaDB'},
                    ]
                },
            ]
        },
        {
            name: 'DevOps',
            children: [
                {
                    name: 'Server',
                    children: [
                        {name: 'Nginx'},
                        {name: 'Apache'},
                        {name: 'Jenkins'},
                        {name: 'Request'},
                        {name: 'Response'},
                        {name: 'TCP/IP'},
                        {name: 'UDP'}
                    ]
                },
                {
                    name: 'Linux',
                    children: [
                        {name: 'Version control system'},
                        {name: 'bash script'},
                        {name: 'Security'},
                    ]
                },
                {
                    name: 'Orchestration',
                    children: [
                        {name: 'Docker'},
                        {name: 'Kubernetes'}
                    ]
                }
            ]
        },
        {
            name: 'Other skills',
            children: [
                {
                    name: 'Design',
                    children: [
                        {name: 'Visual Design'},
                        {name: 'Web Design'},
                        {name: 'UI / UX'},
                        {name: 'Architect skills'}
                    ]
                },
                {
                    name: 'Mathematics',
                    children: [
                        {name: 'Analysis'},
                        {name: 'Algebra'},
                        {name: 'Geometry'},
                    ]
                },
                {
                    name: 'Physics',
                    children: [
                        {name: 'Mechanics (Newtonian)'},
                        {name: 'Fluids (Mechanics)'},
                    ]
                },
            ]
        },
        {
            name: 'Game Development',
            children: [
                {name: 'Unity'},
                {name: 'Unreal'},
                {name: 'Apply Physics, Mathematics in games'}
            ]
        },
        {
            name: 'Mobile',
            children: [
                {name: 'IOS'},
                {name: 'Android'},
                {name: '...React Native'}
            ]
        },
        {
            name: 'Artificial Inteligence',
            children: [
                {name: 'Machine Learning'},
                {name: 'Deep Learning'},
            ]
        }
    ]
};


class MindMapCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero: {},
            loaded: false,
        };

    }
    

    componentDidMount() {
        axios.get('https://api.raulgavris.com/hero/')
        .then(res => {
            this.setState({
                hero: res.data[0],
            })
        })
        .then(setTimeout(() => {
            this.setState({loaded: true})
        }, 500))
    }

    render() {
        return (
            <div>
                <LoadingScreen
                    loading={!this.state.loaded}
                    bgColor={styles.color1}
                    spinnerColor={styles.color2}
                    textColor={styles.color4}
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/loading.png'
                    text='Loading...'
                    children=''
                />

                <div className="custom-container">
                    <Tree
                        data={dataGeneral}
                        height={3000}
                        width={3000}
                        margins={{ bottom : -100, left : 1000, right : 1000, top : 100}}
                        svgProps={{
                            transform: 'rotate(90)'
                        }}
                    />
                </div>
                <Link to='/'><button className="back-button">Go to Home</button></Link>
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default MindMapCustom;
