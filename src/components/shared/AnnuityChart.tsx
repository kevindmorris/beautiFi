import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import USDollar from "../../utils/USDollar";
import { capitalize } from "@mui/material";
import moment from "moment";

export default function AnnuityChart({
  data,
  interval,
}: {
  data: any;
  interval: number;
}) {
  const yAxisWidth = Math.max(
    17 * Math.round(data[data.length - 1].balance).toString().length,
    100
  );

  return (
    <ResponsiveContainer width="100%" height={600}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="90%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="90%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          minTickGap={50}
          tickMargin={15}
          tickCount={10}
          tickFormatter={(value: any, index: number) =>
            moment(value).format(interval === 1 ? "yyyy" : "yyyy MMMM")
          }
        />
        <YAxis
          width={yAxisWidth}
          tickFormatter={(value: any, index: number) => USDollar.format(value)}
        />
        <Tooltip
          formatter={(
            value: any,
            name: any,
            item: any,
            index: number,
            payload: any
          ) => [USDollar.format(value), capitalize(name)]}
          labelFormatter={(label: any, payload: any) =>
            moment(label).format(interval === 1 ? "yyyy" : "yyyy MMMM")
          }
        />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#8884d8"
          dot={false}
          fillOpacity={1}
          fill="url(#colorBalance)"
        />
        <Area
          type="monotone"
          dataKey="principal"
          stroke="#82ca9d"
          dot={false}
          fillOpacity={1}
          fill="url(#colorPrincipal)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
