import React, {Component} from 'react'

export default class Calendar extends Component {
    prevWeek() {
        this.props.getDate('prev', this.props.week);
    }

    nextWeek() {
        this.props.getDate('next', this.props.week);
    }

    render() {
        const NameDays = ['', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const HoursInTheDay = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21];
        let monday = new Date(this.props.week);

        function nextDay(date, index) {
            let day = +date.getDate();
            date = new Date(date.getFullYear(), date.getMonth(), day + index - 1);
            return date.getDate();
        }

        return (
            <div className='wrapper' id='Schedule'>
                <div className='arrow' onClick={::this.prevWeek} id='prev'/>
                <div className='arrow' onClick={::this.nextWeek} id='next'/>
                <table>
                    <thead>
                    <tr>
                        {NameDays.map((num, index) => (
                            <td>
                                <div className='number' id={'number-' + index}>
                                    {
                                        index > 0 ? nextDay(monday, index) : ''
                                    }
                                </div>
                                <div>{num}</div>
                            </td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        HoursInTheDay.map((hour) => (
                            <tr id={'h' + hour}>
                                {NameDays.map((num, index) => (
                                    <td className='battle'
                                        id={monday.getFullYear() + '-' + monday.getMonth() + '-' + (+monday.getDate() + (index - 1))}>
                                        <div>
                                            {console.log( ' Component visit - ' + this.props.visit)};
                                            {/*{index < 1 ? hour : this.props.visit[monday.getFullYear() + '-' + monday.getMonth() + '-' + (+monday.getDate() + (index - 1))].visitCount }*/}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))

                    }
                    </tbody>
                </table>
            </div>
        );
    }

}