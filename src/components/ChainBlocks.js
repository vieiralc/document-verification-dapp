import React, { Component } from 'react'
import ContractConnection from '../contract/ContractConnection'
import BlockContent from './BlockContent'

export default class ChainAnimation extends Component {

    constructor() {
        super()
        this.web3 = new ContractConnection().getWeb3()
        this.state = { 
            blocks: [{
                blockNumber: null,
                gasLimit: null,
                gasUsed: null,
                blockHash: null,
                txHash: null,
                parentHash: null,
                timestamp: null
            }]
        }
    }

    componentDidMount() {
        for(let i = 1; i <= this.web3.eth.blockNumber; i++) {
            this.web3.eth.getBlock(i, true, (err, res) => {
                this.setState({blocks: [...this.state.blocks, {
                    blockNumber: i,
                    gasLimit: res.gasLimit,
                    gasUsed: res.gasUsed,
                    blockHash: res.hash,
                    txHash: res.transactions[0].hash,
                    parentHash: res.parentHash,
                    timestamp: res.timestamp
                }]})
            })
        }
    }

    render() {
        return (
        <div className='col-md-6'> 
            <div className='row'>
                <div id='chain' className='col-md-6'><br/>
                    <h3 className='text-left'> Blocks </h3>
                        <div className='vertical-scroll'>
                            {this.state.blocks.map(block => {
                                if (block.blockNumber % 2 !== 0) {
                                    return <BlockContent key={block.blockNumber}
                                            blockNumber={block.blockNumber}
                                            blockHash={block.blockHash} 
                                            parentHash={block.parentHash}
                                            txHash={block.txHash}
                                            gasLimit={block.gasLimit}
                                            gasUsed={block.gasUsed}
                                            timestamp={block.timestamp}
                                        />
                                }
                            })}
                        </div>
                </div>
                <div id='chain' className='col-md-6'><br/>
                    <h3 className='text-left'> Blocks </h3>
                        <div className='vertical-scroll'>
                            {this.state.blocks.map(block => {
                                if (block.blockNumber % 2 === 0 && block.blockNumber !== null) {
                                    return <BlockContent key={block.blockNumber}
                                            blockNumber={block.blockNumber}
                                            blockHash={block.blockHash} 
                                            parentHash={block.parentHash}
                                            txHash={block.txHash}
                                            gasLimit={block.gasLimit}
                                            gasUsed={block.gasUsed}
                                            timestamp={block.timestamp}
                                        />
                                }
                            })}
                        </div>
                </div>
                
            </div>
        </div>
        )
    }
}
