import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';

class History extends Component {

    componentDidMount() {
        const { dispatch } = this.props

        fetchCalendarResults()
            .then((res) => {
                return dispatch(receiveEntries(res))
            }).then((res) => {
                if (!res[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }));
                }
            });
    }

    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
            {
                today ? (
                    <View>
                        <DateHeader date={formattedDate} />
                        <Text style={styles.noDataText}>{today}</Text>
                    </View>
                ) : (
                        <TouchableOpacity onPress={() => (console.log('pressed'))}>
                            <MetricCard metrics={metrics} date={formattedDate}></MetricCard>
                        </TouchableOpacity>
                    )
            }
        </View>
    )

    renderEmptyDate = (formattedDate) => (
        <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>You didn't log any data in this day.</Text>
        </View>
    )

    render() {
        const { entries } = this.props;

        return (
            <View>
                {/* <UdaciFitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate} /> */}
                <Text>capi</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {},
    noDataText: {
        fontSize: 20
    }
})

function mapStateToProps(entries) {
    return {
        entries
    };
}

export default connect(mapStateToProps)(History);