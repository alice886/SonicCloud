import React from 'react';

const Sider = () => {


    return (
        <>
            <button>About</button>

            <div className='sider-container'>
                <div className='sider-mid'>
                </div>
                <div className='sider-top'>
                    <div >
                        <h3>About SonicCloud</h3>
                        <a href='https://github.com/alice886/OpenTaste' target="_blank" rel="noopener noreferrer">Project Repo</a>
                        <br></br>
                        <a href='https://github.com/alice886/OpenTaste/wiki' target="_blank" rel="noopener noreferrer">Project Wiki</a>

                    </div>
                    <div>
                        <h3>About the Developer</h3>
                        <a href='https://github.com/alice886' target="_blank" rel="noopener noreferrer">GitHub</a>
                        <br></br>
                        <a href='https://www.linkedin.com/in/alice886/' target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>

                </div>
                <div className='sider-bottom'>
                    <div>{ }</div>
                    <br></br>
                    <div>{ }</div>
                    <br></br>
                    <div>{ }</div>
                    <br></br>
                    <div>{ }</div>
                </div>
            </div >
        </>
    );
}
export default Sider;
