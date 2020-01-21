import React from 'react'

export default class ScrollToTop extends React.Component {
    constructor(props) {
        super(props)
        this.childDiv = React.createRef()
    }

    componentDidMount = () => this.handleScroll()

    componentDidUpdate = () => this.handleScroll()

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
        }
    }

    render() {
        return <div ref={this.childDiv}></div>
    }
}