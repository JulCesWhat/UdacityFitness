import React, { version } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DateHeader from './DateHeader';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors'

export default function MetricCard({ data, metrics }) {
    return (
        <View>
            {
                data && <DateHeader date={date} />
            }
            {
                Object.keys(metrics).map((metric) => {
                    const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric);

                    return (
                        <View style={styles.metric} key={metric}>
                            {getIcon()}
                            <View style={{ fontSize: 20 }}>
                                <Text>{displayName}</Text>
                                <Text style={{ fontSize: 16, color: gray }}>
                                    {metrics[metric]} {unit}
                                </Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row',
        marginTop: 12
    }
});