import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Typography, capitalize, useTheme } from "@mui/material";
import moment from "moment";

import USDollar from "../../../utils/USDollar";

export default function Chart({
  data,
  paymentFrequency,
}: {
  data: any;
  paymentFrequency: number;
}) {
  const theme = useTheme();

  const yAxisWidth = Math.max(
    17 * Math.round(data[data.length - 1].balance).toString().length,
    100
  );

  return (
    <div
      style={{
        width: "99%",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme.palette.success.main}
                stopOpacity={0.8}
              />
              <stop
                offset="90%"
                stopColor={theme.palette.success.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            minTickGap={50}
            tickMargin={15}
            height={40}
            tickCount={10}
            tickFormatter={(value: any, index: number) =>
              moment(value).format(
                paymentFrequency === 1 ? "yyyy" : "yyyy MMMM"
              )
            }
            style={{ fontFamily: "monospace" }}
          />
          <YAxis
            width={yAxisWidth}
            tickFormatter={(value: any, index: number) =>
              USDollar.format(value)
            }
            style={{ fontFamily: "monospace" }}
          />
          <Tooltip
            formatter={(value: any, name: any) => [
              USDollar.format(value),
              capitalize(name),
            ]}
            labelFormatter={(label: any) =>
              moment(label).format(
                paymentFrequency === 1 ? "yyyy" : "yyyy MMMM"
              )
            }
            itemStyle={{ fontFamily: "monospace" }}
            contentStyle={{ fontFamily: "monospace" }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={theme.palette.success.main}
            dot={false}
            fillOpacity={1}
            fill="url(#colorBalance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
