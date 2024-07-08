

//let accord 		= document.getElementById("appMenuItemsDesc");                              //- Get the accordion templates list
					//let liveItems 	= self.profile.categories.length;                                           //- Get the current categories length and
					//for( let x = liveItems; x < 20; x++ ) {                                                     //- Go through the rest of the templates
					//	let menuItem = document.getElementById( "appMenuItem" + x );                            //- One by one and then
					//	accord.removeChild( menuItem );                                                         //- Remove it
					//}



{/*}
            <Accordion id="appMenuItemsDesc" className='mt-2' alwaysOpen="true">
                <Accordion.Item eventKey="0" id="appMenuItem0">
                    <Accordion.Header><h4 className='me-2'>
                        <img id="appCatImage0"  src="" alt="" className='app-cat-image' />
                        </h4><h4 id="appItemHeader0">Menu #1</h4>
                    </Accordion.Header>
                    <Accordion.Body id="appFoodItems0" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="0">
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" id="appMenuItem1">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage1"  src="" alt="" className='app-cat-image' />
                    </h4><h4 id="appItemHeader1">Menu #2</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems1" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="1"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" id="appMenuItem2">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage2"  src="" alt="" className='app-cat-image' />
                    </h4><h4 id="appItemHeader2">Menu #3</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems2" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="2"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" id="appMenuItem3">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage3"  src="" alt="" className='app-cat-image' />
                    </h4><h4 id="appItemHeader3">Menu #4</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems3" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="3"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4" id="appMenuItem4">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage4"  src="" alt="" className='app-cat-image' />
                    </h4><h4 id="appItemHeader4">Menu #5</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems4" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="4"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5" id="appMenuItem5">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage5"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader5">Menu #6</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems5" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="5"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6" id="appMenuItem6">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage6"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader6">Menu #7</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems6" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="6"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7" id="appMenuItem7">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage7"  src="" alt="" className='app-cat-image' />
                    </h4><h4 id="appItemHeader7">Menu #8</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems7" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="7"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8" id="appMenuItem8">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage8"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader8">Menu #9</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems8" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="8"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9" id="appMenuItem9">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage9"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader9">Menu #10</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems9" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="9"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="10" id="appMenuItem10">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage10"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader10">Menu #11</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems10" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="10"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="11" id="appMenuItem11">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage11"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader11">Menu #12</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems11" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="11"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="12" id="appMenuItem12">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage12"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader12">Menu #13</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems12" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="12"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="13" id="appMenuItem13">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage13"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader13">Menu #14</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems13" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="13"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="14" id="appMenuItem14">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage14"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader14">Menu #15</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems14" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="14"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="15" id="appMenuItem15">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage15"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader15">Menu #16</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems15" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="15"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="16" id="appMenuItem16">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage16"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader16">Menu #17</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems16" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="16"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="17" id="appMenuItem17">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage17"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader17">Menu #18</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems17" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="17"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="18" id="appMenuItem18">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage18"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader18">Menu #19</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems18" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="18"></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="19" id="appMenuItem19">
                    <Accordion.Header><h4 className='me-2'>
                    <img id="appCatImage19"  src="" alt="" className='app-cat-image' />    
                    </h4><h4 id="appItemHeader19">Menu #20</h4></Accordion.Header>
                    <Accordion.Body id="appFoodItems19" onEnter={this.handleOnEnter} onExit={this.handleOnExit} data-index="19"></Accordion.Body>
                </Accordion.Item>
            </Accordion>
            */}