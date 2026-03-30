import { Box, Typography, Grid, Button, Chip, Divider } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useNavigate, useOutletContext } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getLast7DaysData(alerts) {
  const map = {};

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map[key] = {
      day: DAY_LABELS[d.getDay()],
      date: key,
      total: 0,
      new: 0,
      read: 0,
    };
  }

  alerts.forEach((a) => {
    const key = new Date(a.created_at).toISOString().slice(0, 10);
    if (map[key]) {
      map[key].total += 1;
      if (a.is_read) map[key].read += 1;
      else           map[key].new  += 1;
    }
  });

  return Object.values(map);
}

function getTodayHourlyData(alerts) {
  const HOUR_SLOTS = [
    { label: "12am", from: 0,  to: 2  },
    { label: "2am",  from: 2,  to: 4  },
    { label: "4am",  from: 4,  to: 6  },
    { label: "6am",  from: 6,  to: 8  },
    { label: "8am",  from: 8,  to: 10 },
    { label: "10am", from: 10, to: 12 },
    { label: "12pm", from: 12, to: 14 },
    { label: "2pm",  from: 14, to: 16 },
    { label: "4pm",  from: 16, to: 18 },
    { label: "6pm",  from: 18, to: 20 },
    { label: "8pm",  from: 20, to: 22 },
    { label: "10pm", from: 22, to: 24 },
  ];

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayAlerts = alerts.filter(
    (a) => new Date(a.created_at).toISOString().slice(0, 10) === todayStr
  );

  return HOUR_SLOTS.map((slot) => ({
    hour: slot.label,
    alerts: todayAlerts.filter((a) => {
      const h = new Date(a.created_at).getHours();
      return h >= slot.from && h < slot.to;
    }).length,
  }));
}

function getTodayTrend(alerts) {
  const todayStr     = new Date().toISOString().slice(0, 10);
  const yesterday    = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const todayCount     = alerts.filter((a) => new Date(a.created_at).toISOString().slice(0, 10) === todayStr).length;
  const yesterdayCount = alerts.filter((a) => new Date(a.created_at).toISOString().slice(0, 10) === yesterdayStr).length;

  if (yesterdayCount === 0) return { trend: "up", pct: 100 };
  const pct = Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);
  return { trend: pct >= 0 ? "up" : "down", pct: Math.abs(pct) };
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ 
      background: "#fff", 
      border: "1px solid #e2e8f0", 
      borderRadius: "10px", 
      p: "10px 14px", 
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)" 
    }}>
      <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((entry, i) => (
        <Typography key={i} sx={{ fontSize: "0.72rem", color: entry.color, fontWeight: 600 }}>
          {entry.name}: {entry.value}
        </Typography>
      ))}
    </Box>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, bg, chipLabel, trend, trendPct }) => (
  <Box sx={{
    p: 2, 
    borderRadius: "16px", 
    background: bg,
    border: "1px solid", 
    borderColor: `${color}22`,
    display: "flex", 
    transition: "all 0.3s ease", 
    cursor: "default", 
    "&:hover": { 
      transform: "translateY(-4px)", 
      boxShadow: `0 12px 32px ${color}20`, 
      borderColor: `${color}44` 
    },
    width:"100%",
    // height:"50%"
    flexDirection:"column"
  }}>
    {/* <Box direction="row" justifyContent="space-between" alignItems="flex-start"> */}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box sx={{ 

        borderRadius: "12px", 
        backgroundColor: `${color}18`, 
      
      
      }}>
        {icon}
      </Box>
      <Box>
      <Chip 
        label={chipLabel} 
        size="small" 
        sx={{ 
          backgroundColor: `${color}12`, 
          color, 
          fontWeight: 700, 
          fontSize: "0.68rem", 
          height: 22, 
          borderRadius: "6px", 
          
        }} 
      />
      </Box>
      </Box>
      
    {/* </Box> */}

    <Box>
      <Typography 
        variant="h3" 
        fontWeight={800} 
        sx={{ 
         
          color: "#0f172a", 
          lineHeight: 1, 
          fontSize:"24px" 
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ 
        mt: 0.4, 
        fontSize: "0.82rem", 
        fontWeight: 500, 
        color: "#64748b", 
        fontFamily: "'DM Sans', sans-serif" 
      }}>
        {label}
      </Typography>
    </Box>

    {trendPct !== undefined && (
      <Box direction="row" alignItems="center" spacing={0.5}>
        {trend === "up"
          ? <TrendingUpIcon sx={{ fontSize: 15, color: "#22c55e" }} />
          : <TrendingDownIcon sx={{ fontSize: 15, color: "#ef4444" }} />}
        <Typography sx={{ 
          fontSize: "0.72rem", 
          fontWeight: 600, 
          color: trend === "up" ? "#22c55e" : "#ef4444", 
          fontFamily: "'DM Sans', sans-serif" 
        }}>
          {trendPct}% vs yesterday
        </Typography>
      </Box>
    )}

    <Box sx={{ 
      height: 3, 
      borderRadius: 10, 
      background: `linear-gradient(90deg, ${color}, ${color}33)`, 
      width: "45%", 
      mt: "auto" 
    }} />
  </Box>
);

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard = ({ title, subtitle, children }) => (
  <Box sx={{ 
    p: 3, 
    borderRadius: "16px", 
    border: "1px solid #e2e8f0", 
    background: "#fff", 
    height: "100%", 
    display: "flex", 
    flexDirection: "column" 
  }}>
    <Box mb={2}>
      <Typography sx={{ 
        fontSize: "0.95rem", 
        fontWeight: 700, 
        color: "#0f172a", 
        fontFamily: "'DM Sans', sans-serif" 
      }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ 
          fontSize: "0.75rem", 
          color: "#94a3b8", 
          fontFamily: "'DM Sans', sans-serif", 
          mt: 0.2 
        }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    <Divider sx={{ mb: 2.5, borderColor: "#f1f5f9" }} />
    {children}
  </Box>
);

// =============================================================================
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function BranchOverview() {
  const navigate = useNavigate();
  const { alerts = [] } = useOutletContext();

  const totalAlerts = alerts.length;
  const newAlerts   = alerts.filter((a) => !a.is_read).length;
  const readAlerts  = alerts.filter((a) =>  a.is_read).length;
  const readPct     = totalAlerts > 0 ? Math.round((readAlerts / totalAlerts) * 100) : 0;

  const weeklyData  = getLast7DaysData(alerts);
  const hourlyData  = getTodayHourlyData(alerts);
  const todayTrend  = getTodayTrend(alerts);

  const pieData = [
    { name: "New",  value: newAlerts  || 0, color: "#ef4444" },
    { name: "Read", value: readAlerts || 0, color: "#22c55e" },
  ];
  
  const safePieData = (newAlerts === 0 && readAlerts === 0)
    ? [{ name: "No Data", value: 1, color: "#e2e8f0" }]
    : pieData;

  const cards = [
    {
      label: "Total Alerts",
      value: totalAlerts,
      color: "#3b82f6", 
      bg: "#f8faff",
      chipLabel: "All Time",
      trend: todayTrend.trend,
      trendPct: todayTrend.pct,
      icon: <NotificationsActiveIcon sx={{ fontSize: 22, color: "#3b82f6" }} />,
    },
    {
      label: "New Alerts",
      value: newAlerts,
      color: "#ef4444", 
      bg: "#fff8f8",
      chipLabel: "Unread",
      icon: <NewReleasesIcon sx={{ fontSize: 22, color: "#ef4444" }} />,
    },
    {
      label: "Read Alerts",
      value: readAlerts,
      color: "#22c55e", 
      bg: "#f6fff9",
      chipLabel: "Done",
      icon: <MarkEmailReadIcon sx={{ fontSize: 22, color: "#22c55e" }} />,
    },
  ];

  const todayLabel = new Date().toLocaleDateString("en-IN", { 
    weekday: "long", 
    day: "numeric", 
    month: "short", 
    year: "numeric" 
  });

  return (
    <Box 
      sx={{
        // pl: { xs: 2, md: 3 },
        // pr: { xs: 2, md: 3 },
        // pt: 3,
        // pb: 3,
        background: "#f8fafc",
        // minHeight: "100vh"
      }}
    >
      {/* ── Header ── */}
     <Box
        sx={{
          background: "#ffffff",
          mb: 3,
          boxShadow:"1px 2px 2px 1px #d5f7e7",
          padding:1,
          mb:6
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Left: Back + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/branch/dashboard")}
              sx={{
                borderColor: "#e2e8f0",
                color: "#64748b",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "none",
                borderRadius: "10px",
                px: 2,
                py: 1,
                // background:"red",
                "&:hover": {
                  borderColor: "#3b82f6",
                  color: "#3b82f6",
                  backgroundColor: "#eff6ff",
                },
              }}
            >
            
            </Button>

            <Box>
              <Typography
                fontWeight={800}
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#0f172a",
                  fontSize:"18px",
                }}
              >
                Dashboard Overview
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  fontFamily: "'DM Sans', sans-serif",
                  mt: 0.3,
                }}
              >
                {todayLabel}
              </Typography>
            </Box>
          </Box>

          {/* Right: Status Badges */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: "10px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#16a34a",
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {readPct}% Read Rate
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: "10px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.4)" },
                    "70%": { boxShadow: "0 0 0 7px rgba(34, 197, 94, 0)" },
                    "100%": { boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)" },
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#22c55e",
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Live
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Stat Cards - Horizontal with proper gaps ── */}
      {/* <Grid container spacing={18} sx={{ mb: 8, px:8 }}> */}
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"} gap={3} mb={4}>
        {cards.map((card, i) => (
          // <Grid item xs={12} sm={6} md={4} key={i} spacing={10}>
         
            <StatCard {...card} />
            
          // </Grid>

        ))}
        </Box>
      {/* </Grid> */}

      {/* ── Weekly Alert Trend + Alert Breakdown - with gap ── */}
<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  {/* Weekly Alert Trend */}
  <Box sx={{ flex: "1 1 calc(33.333% - 8px)", minWidth: "300px" }}>
    <SectionCard
      title="Weekly Alert Trend"
      subtitle="Last 7 days — derived from alert created_at timestamps"
    >
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.13} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradRead" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            allowDecimals={false} 
            tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            iconType="circle" 
            iconSize={8} 
            wrapperStyle={{ fontSize: "0.73rem", fontFamily: "DM Sans", paddingTop: 8 }} 
          />
          <Area 
            type="monotone" 
            dataKey="total" 
            name="Total" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            fill="url(#gradTotal)" 
            dot={false} 
          />
          <Area 
            type="monotone" 
            dataKey="new" 
            name="New" 
            stroke="#ef4444" 
            strokeWidth={2} 
            fill="url(#gradNew)" 
            dot={false} 
          />
          <Area 
            type="monotone" 
            dataKey="read" 
            name="Read" 
            stroke="#22c55e" 
            strokeWidth={2} 
            fill="url(#gradRead)" 
            dot={false} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </SectionCard>
  </Box>

  {/* Today's Alerts by Hour */}
  <Box sx={{ flex: "1 1 calc(33.333% - 8px)", minWidth: "300px" }}>
    <SectionCard
      title="Today's Alerts by Hour"
      subtitle={`Alert volume for today (${todayLabel}) grouped by 2-hour slots`}
    >
      {hourlyData.every((d) => d.alerts === 0) ? (
        <Box sx={{ 
          height: 250, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}>
          <Typography sx={{ 
            color: "#94a3b8", 
            fontSize: "0.85rem", 
            fontFamily: "'DM Sans', sans-serif" 
          }}>
            No alerts received today yet.
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart 
            data={hourlyData} 
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }} 
            barSize={28}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              allowDecimals={false} 
              tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="alerts" name="Alerts" radius={[6, 6, 0, 0]}>
              {hourlyData.map((entry, i) => (
                <Cell key={i} fill={entry.alerts >= 5 ? "#3b82f6" : "#bfdbfe"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </SectionCard>
  </Box>

  {/* Alert Breakdown */}
  <Box sx={{ flex: "1 1 calc(33.333% - 8px)", minWidth: "300px" }}>
    <SectionCard title="Alert Breakdown" subtitle="Real new vs read split from DB">
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "space-between", 
        height: "100%", 
        minHeight: 250 
      }}>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie 
              data={safePieData} 
              cx="50%" 
              cy="50%" 
              innerRadius={45} 
              outerRadius={65} 
              paddingAngle={4} 
              dataKey="value"
            >
              {safePieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: 10, 
                border: "1px solid #e2e8f0", 
                fontSize: "0.75rem", 
                fontFamily: "DM Sans" 
              }} 
            />
          </PieChart>
        </ResponsiveContainer>

        <Box direction="row" spacing={3} mt={0.5}>
          {pieData.map((item) => (
            <Box key={item.name} direction="row" alignItems="center" spacing={0.8}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: "3px", 
                backgroundColor: item.color 
              }} />
              <Typography sx={{ 
                fontSize: "0.75rem", 
                color: "#64748b", 
                fontFamily: "'DM Sans', sans-serif", 
                fontWeight: 600 
              }}>
                {item.name} ({item.value})
              </Typography>
            </Box>
          ))}
        </Box>

        <Box mt={1.5} textAlign="center">
          <Typography sx={{ 
            fontSize: "0.72rem", 
            color: "#94a3b8", 
            fontFamily: "'DM Sans', sans-serif" 
          }}>
          
            Resolution rate 
          </Typography>
          <Typography sx={{ 
            fontSize: "1.6rem", 
            fontWeight: 800, 
            color: "#0f172a", 
            fontFamily: "'DM Sans', sans-serif", 
            letterSpacing: "-1px" 
          }}>
            {readPct}%
          </Typography>
        </Box>
      </Box>
    </SectionCard>
  </Box>
</Box>

    </Box>
  );
}

export default BranchOverview;





////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { Box, Typography, Grid, Button, Box, Chip, Divider, Paper } from "@mui/material";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
// import NewReleasesIcon from "@mui/icons-material/NewReleases";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {
//   AreaChart, Area,
//   BarChart, Bar,
//   PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid,
//   Tooltip, ResponsiveContainer, Legend,
//   LineChart, Line,
// } from "recharts";

// // ─────────────────────────────────────────────────────────────────────────────
// // UTILITY: derive last-7-days trend data from real alerts array
// // ─────────────────────────────────────────────────────────────────────────────

// const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// function getLast7DaysData(alerts) {
//   const map = {};

//   for (let i = 6; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);
//     const key = d.toISOString().slice(0, 10);
//     map[key] = {
//       day: DAY_LABELS[d.getDay()],
//       date: key,
//       total: 0,
//       new: 0,
//       read: 0,
//     };
//   }

//   alerts.forEach((a) => {
//     const key = new Date(a.created_at).toISOString().slice(0, 10);
//     if (map[key]) {
//       map[key].total += 1;
//       if (a.is_read) map[key].read += 1;
//       else           map[key].new  += 1;
//     }
//   });

//   return Object.values(map);
// }

// function getTodayHourlyData(alerts) {
//   const HOUR_SLOTS = [
//     { label: "12am", from: 0,  to: 2  },
//     { label: "2am",  from: 2,  to: 4  },
//     { label: "4am",  from: 4,  to: 6  },
//     { label: "6am",  from: 6,  to: 8  },
//     { label: "8am",  from: 8,  to: 10 },
//     { label: "10am", from: 10, to: 12 },
//     { label: "12pm", from: 12, to: 14 },
//     { label: "2pm",  from: 14, to: 16 },
//     { label: "4pm",  from: 16, to: 18 },
//     { label: "6pm",  from: 18, to: 20 },
//     { label: "8pm",  from: 20, to: 22 },
//     { label: "10pm", from: 22, to: 24 },
//   ];

//   const todayStr = new Date().toISOString().slice(0, 10);
//   const todayAlerts = alerts.filter(
//     (a) => new Date(a.created_at).toISOString().slice(0, 10) === todayStr
//   );

//   return HOUR_SLOTS.map((slot) => ({
//     hour: slot.label,
//     alerts: todayAlerts.filter((a) => {
//       const h = new Date(a.created_at).getHours();
//       return h >= slot.from && h < slot.to;
//     }).length,
//   }));
// }

// function getTodayTrend(alerts) {
//   const todayStr     = new Date().toISOString().slice(0, 10);
//   const yesterday    = new Date(); yesterday.setDate(yesterday.getDate() - 1);
//   const yesterdayStr = yesterday.toISOString().slice(0, 10);

//   const todayCount     = alerts.filter((a) => new Date(a.created_at).toISOString().slice(0, 10) === todayStr).length;
//   const yesterdayCount = alerts.filter((a) => new Date(a.created_at).toISOString().slice(0, 10) === yesterdayStr).length;

//   if (yesterdayCount === 0) return { trend: "up", pct: 100 };
//   const pct = Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);
//   return { trend: pct >= 0 ? "up" : "down", pct: Math.abs(pct) };
// }

// // Get recent alerts for quick view
// function getRecentAlerts(alerts, count = 5) {
//   return [...alerts]
//     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//     .slice(0, count);
// }

// // ─── Custom Tooltip ───────────────────────────────────────────────────────────
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <Box sx={{ 
//       background: "#fff", 
//       border: "1px solid #e2e8f0", 
//       borderRadius: "10px", 
//       p: "10px 14px", 
//       boxShadow: "0 4px 16px rgba(0,0,0,0.08)" 
//     }}>
//       <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
//         {label}
//       </Typography>
//       {payload.map((entry, i) => (
//         <Typography key={i} sx={{ fontSize: "0.72rem", color: entry.color, fontWeight: 600 }}>
//           {entry.name}: {entry.value}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// const StatCard = ({ label, value, icon, color, bg, chipLabel, trend, trendPct }) => (
//   <Box sx={{
//     p: 2.5, 
//     borderRadius: "16px", 
//     background: bg,
//     border: "1px solid", 
//     borderColor: `${color}22`,
//     display: "flex", 
//     flexDirection: "column", 
//     gap: 1.2,
//     transition: "all 0.3s ease", 
//     cursor: "default", 
//     height: "100%",
//     "&:hover": { 
//       transform: "translateY(-4px)", 
//       boxShadow: `0 12px 32px ${color}20`, 
//       borderColor: `${color}44` 
//     },
//   }}>
//     <Box direction="row" justifyContent="space-between" alignItems="flex-start">
//       <Box sx={{ 
//         width: 40, 
//         height: 40, 
//         borderRadius: "12px", 
//         backgroundColor: `${color}18`, 
//         display: "flex", 
//         alignItems: "center", 
//         justifyContent: "center" 
//       }}>
//         {icon}
//       </Box>
//       <Chip 
//         label={chipLabel} 
//         size="small" 
//         sx={{ 
//           backgroundColor: `${color}12`, 
//           color, 
//           fontWeight: 700, 
//           fontSize: "0.68rem", 
//           height: 22, 
//           borderRadius: "6px", 
//           fontFamily: "'DM Sans', sans-serif" 
//         }} 
//       />
//     </Box>

//     <Box>
//       <Typography 
//         variant="h3" 
//         fontWeight={800} 
//         sx={{ 
//           fontFamily: "'DM Sans', sans-serif", 
//           color: "#0f172a", 
//           lineHeight: 1, 
//           letterSpacing: "-1.5px", 
//           fontSize: "2rem"
//         }}
//       >
//         {value}
//       </Typography>
//       <Typography sx={{ 
//         mt: 0.4, 
//         fontSize: "0.82rem", 
//         fontWeight: 500, 
//         color: "#64748b", 
//         fontFamily: "'DM Sans', sans-serif" 
//       }}>
//         {label}
//       </Typography>
//     </Box>

//     {trendPct !== undefined && (
//       <Box direction="row" alignItems="center" spacing={0.5}>
//         {trend === "up"
//           ? <TrendingUpIcon sx={{ fontSize: 15, color: "#22c55e" }} />
//           : <TrendingDownIcon sx={{ fontSize: 15, color: "#ef4444" }} />}
//         <Typography sx={{ 
//           fontSize: "0.72rem", 
//           fontWeight: 600, 
//           color: trend === "up" ? "#22c55e" : "#ef4444", 
//           fontFamily: "'DM Sans', sans-serif" 
//         }}>
//           {trendPct}% vs yesterday
//         </Typography>
//       </Box>
//     )}

//     <Box sx={{ 
//       height: 3, 
//       borderRadius: 10, 
//       background: `linear-gradient(90deg, ${color}, ${color}33)`, 
//       width: "45%", 
//       mt: "auto" 
//     }} />
//   </Box>
// );

// // ─── Section Card ─────────────────────────────────────────────────────────────
// const SectionCard = ({ title, subtitle, children, action }) => (
//   <Box sx={{ 
//     p: 2.5, 
//     borderRadius: "16px", 
//     border: "1px solid #e2e8f0", 
//     background: "#fff", 
//     height: "100%", 
//     display: "flex", 
//     flexDirection: "column" 
//   }}>
//     <Box direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
//       <Box>
//         <Typography sx={{ 
//           fontSize: "0.95rem", 
//           fontWeight: 700, 
//           color: "#0f172a", 
//           fontFamily: "'DM Sans', sans-serif" 
//         }}>
//           {title}
//         </Typography>
//         {subtitle && (
//           <Typography sx={{ 
//             fontSize: "0.72rem", 
//             color: "#94a3b8", 
//             fontFamily: "'DM Sans', sans-serif", 
//             mt: 0.2 
//           }}>
//             {subtitle}
//           </Typography>
//         )}
//       </Box>
//       {action}
//     </Box>
//     <Divider sx={{ mb: 2, borderColor: "#f1f5f9" }} />
//     {children}
//   </Box>
// );

// // ─── Recent Alert Item ────────────────────────────────────────────────────────
// const RecentAlertItem = ({ alert }) => {
//   const timeAgo = (date) => {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     if (seconds < 60) return `${seconds}s ago`;
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   return (
//     <Box sx={{
//       p: 1.5,
//       borderRadius: "10px",
//       backgroundColor: alert.is_read ? "#f8fafc" : "#fefce8",
//       border: "1px solid",
//       borderColor: alert.is_read ? "#e2e8f0" : "#fde68a",
//       transition: "all 0.2s ease",
//       "&:hover": {
//         backgroundColor: alert.is_read ? "#f1f5f9" : "#fef9c3",
//         borderColor: alert.is_read ? "#cbd5e1" : "#fcd34d",
//       }
//     }}>
//       <Box direction="row" spacing={1.5} alignItems="flex-start">
//         {!alert.is_read && (
//           <Box sx={{
//             width: 8,
//             height: 8,
//             borderRadius: "50%",
//             backgroundColor: "#f59e0b",
//             flexShrink: 0,
//             mt: 0.8,
//           }} />
//         )}
//         <Box sx={{ flex: 1, minWidth: 0 }}>
//           <Typography sx={{
//             fontSize: "0.8rem",
//             fontWeight: alert.is_read ? 500 : 600,
//             color: "#0f172a",
//             fontFamily: "'DM Sans', sans-serif",
//             mb: 0.5,
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//           }}>
//             {alert.message}
//           </Typography>
//           <Box direction="row" spacing={1} alignItems="center">
//             <AccessTimeIcon sx={{ fontSize: "0.75rem", color: "#94a3b8" }} />
//             <Typography sx={{
//               fontSize: "0.7rem",
//               color: "#94a3b8",
//               fontFamily: "'DM Mono', monospace",
//             }}>
//               {timeAgo(alert.created_at)}
//             </Typography>
//             {alert.is_read && (
//               <Chip
//                 label="Read"
//                 size="small"
//                 sx={{
//                   height: 18,
//                   fontSize: "0.65rem",
//                   fontFamily: "'DM Mono', monospace",
//                   backgroundColor: "#f0fdf4",
//                   color: "#15803d",
//                   border: "1px solid #bbf7d0",
//                   "& .MuiChip-label": { px: 0.8 }
//                 }}
//               />
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// function BranchOverview() {
//   const navigate = useNavigate();
//   const { alerts = [] } = useOutletContext();

//   const totalAlerts = alerts.length;
//   const newAlerts   = alerts.filter((a) => !a.is_read).length;
//   const readAlerts  = alerts.filter((a) =>  a.is_read).length;
//   const readPct     = totalAlerts > 0 ? Math.round((readAlerts / totalAlerts) * 100) : 0;

//   const weeklyData  = getLast7DaysData(alerts);
//   const hourlyData  = getTodayHourlyData(alerts);
//   const todayTrend  = getTodayTrend(alerts);
//   const recentAlerts = getRecentAlerts(alerts, 5);

//   const pieData = [
//     { name: "New",  value: newAlerts  || 0, color: "#ef4444" },
//     { name: "Read", value: readAlerts || 0, color: "#22c55e" },
//   ];
  
//   const safePieData = (newAlerts === 0 && readAlerts === 0)
//     ? [{ name: "No Data", value: 1, color: "#e2e8f0" }]
//     : pieData;

//   const cards = [
//     {
//       label: "Total Alerts",
//       value: totalAlerts,
//       color: "#3b82f6", 
//       bg: "#f8faff",
//       chipLabel: "All Time",
//       trend: todayTrend.trend,
//       trendPct: todayTrend.pct,
//       icon: <NotificationsActiveIcon sx={{ fontSize: 20, color: "#3b82f6" }} />,
//     },
//     {
//       label: "New Alerts",
//       value: newAlerts,
//       color: "#ef4444", 
//       bg: "#fff8f8",
//       chipLabel: "Unread",
//       icon: <NewReleasesIcon sx={{ fontSize: 20, color: "#ef4444" }} />,
//     },
//     {
//       label: "Read Alerts",
//       value: readAlerts,
//       color: "#22c55e", 
//       bg: "#f6fff9",
//       chipLabel: "Done",
//       icon: <MarkEmailReadIcon sx={{ fontSize: 20, color: "#22c55e" }} />,
//     },
//   ];

//   const todayLabel = new Date().toLocaleDateString("en-IN", { 
//     weekday: "long", 
//     day: "numeric", 
//     month: "short", 
//     year: "numeric" 
//   });

//   return (
//     <Box sx={{ p: { xs: 2.5, md: 3 }, background: "#f8fafc", minHeight: "100vh" }}>

//       {/* ── Header ── */}
//       <Box 
//         direction="row" 
//         alignItems="center" 
//         justifyContent="space-between" 
//         mb={3.5} 
//         flexWrap="wrap" 
//         gap={2}
//       >
//         <Box direction="row" alignItems="center" spacing={2}>
//           <Button
//             variant="outlined"
//             startIcon={<ArrowBackIcon sx={{ fontSize: "0.9rem !important" }} />}
//             onClick={() => navigate(-1)}
//             sx={{
//               borderColor: "#e2e8f0", 
//               color: "#64748b",
//               fontFamily: "'DM Sans', sans-serif", 
//               fontWeight: 600,
//               fontSize: "0.78rem", 
//               textTransform: "none", 
//               borderRadius: "10px",
//               px: 2, 
//               py: 0.8,
//               "&:hover": { 
//                 borderColor: "#3b82f6", 
//                 color: "#3b82f6", 
//                 backgroundColor: "#eff6ff" 
//               },
//             }}
//           >
//             Back
//           </Button>
//           <Box>
//             <Typography 
//               variant="h5" 
//               fontWeight={800} 
//               sx={{ 
//                 fontFamily: "'DM Sans', sans-serif", 
//                 color: "#0f172a", 
//                 letterSpacing: "-0.5px" 
//               }}
//             >
//               Dashboard Overview
//             </Typography>
//             <Box direction="row" alignItems="center" spacing={0.8} mt={0.2}>
//               <CalendarMonthIcon sx={{ fontSize: "0.85rem", color: "#94a3b8" }} />
//               <Typography sx={{ 
//                 fontSize: "0.75rem", 
//                 color: "#94a3b8", 
//                 fontFamily: "'DM Sans', sans-serif" 
//               }}>
//                 {todayLabel}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         <Box direction="row" alignItems="center" spacing={2}>
//           <Box sx={{ 
//             px: 2, 
//             py: 0.8, 
//             borderRadius: "10px", 
//             background: "#f0fdf4", 
//             border: "1px solid #bbf7d0" 
//           }}>
//             <Typography sx={{ 
//               fontSize: "0.75rem", 
//               color: "#16a34a", 
//               fontWeight: 700, 
//               fontFamily: "'DM Sans', sans-serif" 
//             }}>
//               {readPct}% Read Rate
//             </Typography>
//           </Box>
//           <Box direction="row" alignItems="center" spacing={0.8}>
//             <Box sx={{
//               width: 8, 
//               height: 8, 
//               borderRadius: "50%", 
//               backgroundColor: "#22c55e",
//               animation: "pulse 2s infinite",
//               "@keyframes pulse": {
//                 "0%":   { boxShadow: "0 0 0 0 #22c55e55" },
//                 "70%":  { boxShadow: "0 0 0 7px #22c55e00" },
//                 "100%": { boxShadow: "0 0 0 0 #22c55e00" },
//               },
//             }} />
//             <Typography sx={{ 
//               fontSize: "0.75rem", 
//               color: "#22c55e", 
//               fontWeight: 700, 
//               fontFamily: "'DM Sans', sans-serif" 
//             }}>
//               Live
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* ── Stat Cards ── */}
//       <Grid container spacing={2.5} mb={2.5}>
//         {cards.map((card, i) => (
//           <Grid item xs={12} sm={4} key={i}>
//             <StatCard {...card} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* ── Main Content Grid ── */}
//       <Grid container spacing={2.5}>
        
//         {/* LEFT COLUMN: Charts */}
//         <Grid item xs={12} lg={8}>
//           <Box spacing={2.5}>
            
//             {/* Weekly Trend */}
//             <SectionCard
//               title="Weekly Alert Trend"
//               subtitle="Last 7 days activity"
//             >
//               <ResponsiveContainer width="100%" height={220}>
//                 <AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.13} />
//                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.15} />
//                       <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="gradRead" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.15} />
//                       <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
//                   <XAxis 
//                     dataKey="day" 
//                     tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
//                     axisLine={false} 
//                     tickLine={false} 
//                   />
//                   <YAxis 
//                     allowDecimals={false} 
//                     tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
//                     axisLine={false} 
//                     tickLine={false} 
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend 
//                     iconType="circle" 
//                     iconSize={8} 
//                     wrapperStyle={{ fontSize: "0.73rem", fontFamily: "DM Sans", paddingTop: 8 }} 
//                   />
//                   <Area 
//                     type="monotone" 
//                     dataKey="total" 
//                     name="Total" 
//                     stroke="#3b82f6" 
//                     strokeWidth={2} 
//                     fill="url(#gradTotal)" 
//                     dot={false} 
//                   />
//                   <Area 
//                     type="monotone" 
//                     dataKey="new" 
//                     name="New" 
//                     stroke="#ef4444" 
//                     strokeWidth={2} 
//                     fill="url(#gradNew)" 
//                     dot={false} 
//                   />
//                   <Area 
//                     type="monotone" 
//                     dataKey="read" 
//                     name="Read" 
//                     stroke="#22c55e" 
//                     strokeWidth={2} 
//                     fill="url(#gradRead)" 
//                     dot={false} 
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </SectionCard>

//             {/* Hourly Distribution */}
//             <SectionCard
//               title="Today's Alert Distribution"
//               subtitle="Hourly breakdown for current day"
//             >
//               {hourlyData.every((d) => d.alerts === 0) ? (
//                 <Box sx={{ 
//                   height: 180, 
//                   display: "flex", 
//                   alignItems: "center", 
//                   justifyContent: "center" 
//                 }}>
//                   <Typography sx={{ 
//                     color: "#94a3b8", 
//                     fontSize: "0.85rem", 
//                     fontFamily: "'DM Sans', sans-serif" 
//                   }}>
//                     No alerts received today yet.
//                   </Typography>
//                 </Box>
//               ) : (
//                 <ResponsiveContainer width="100%" height={180}>
//                   <BarChart 
//                     data={hourlyData} 
//                     margin={{ top: 5, right: 10, left: -20, bottom: 0 }} 
//                     barSize={24}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
//                     <XAxis 
//                       dataKey="hour" 
//                       tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
//                       axisLine={false} 
//                       tickLine={false} 
//                     />
//                     <YAxis 
//                       allowDecimals={false} 
//                       tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} 
//                       axisLine={false} 
//                       tickLine={false} 
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="alerts" name="Alerts" radius={[6, 6, 0, 0]}>
//                       {hourlyData.map((entry, i) => (
//                         <Cell key={i} fill={entry.alerts >= 3 ? "#3b82f6" : "#bfdbfe"} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </SectionCard>

//           </Box>
//         </Grid>

//         {/* RIGHT COLUMN: Pie Chart + Recent Alerts */}
//         <Grid item xs={12} lg={4}>
//           <Box spacing={2.5}>
            
//             {/* Alert Breakdown Pie */}
//             <SectionCard 
//               title="Alert Status" 
//               subtitle="Current breakdown"
//             >
//               <Box sx={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 alignItems: "center", 
//                 minHeight: 260 
//               }}>
//                 <ResponsiveContainer width="100%" height={180}>
//                   <PieChart>
//                     <Pie 
//                       data={safePieData} 
//                       cx="50%" 
//                       cy="50%" 
//                       innerRadius={50} 
//                       outerRadius={75} 
//                       paddingAngle={4} 
//                       dataKey="value"
//                     >
//                       {safePieData.map((entry, i) => (
//                         <Cell key={i} fill={entry.color} stroke="none" />
//                       ))}
//                     </Pie>
//                     <Tooltip 
//                       contentStyle={{ 
//                         borderRadius: 10, 
//                         border: "1px solid #e2e8f0", 
//                         fontSize: "0.75rem", 
//                         fontFamily: "DM Sans" 
//                       }} 
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>

//                 <Box direction="row" spacing={3} mt={1}>
//                   {pieData.map((item) => (
//                     <Box key={item.name} direction="row" alignItems="center" spacing={0.8}>
//                       <Box sx={{ 
//                         width: 10, 
//                         height: 10, 
//                         borderRadius: "3px", 
//                         backgroundColor: item.color 
//                       }} />
//                       <Typography sx={{ 
//                         fontSize: "0.75rem", 
//                         color: "#64748b", 
//                         fontFamily: "'DM Sans', sans-serif", 
//                         fontWeight: 600 
//                       }}>
//                         {item.name} ({item.value})
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Box>

//                 <Box mt={1.5} textAlign="center">
//                   <Typography sx={{ 
//                     fontSize: "0.7rem", 
//                     color: "#94a3b8", 
//                     fontFamily: "'DM Sans', sans-serif" 
//                   }}>
//                     Resolution Rate
//                   </Typography>
//                   <Typography sx={{ 
//                     fontSize: "1.5rem", 
//                     fontWeight: 800, 
//                     color: "#0f172a", 
//                     fontFamily: "'DM Sans', sans-serif", 
//                     letterSpacing: "-1px" 
//                   }}>
//                     {readPct}%
//                   </Typography>
//                 </Box>
//               </Box>
//             </SectionCard>

//             {/* Recent Alerts */}
//             <SectionCard
//               title="Recent Activity"
//               subtitle={`Last ${recentAlerts.length} alerts`}
//               action={
//                 <Button
//                   size="small"
//                   onClick={() => navigate("/branch/alerts")}
//                   sx={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.72rem",
//                     fontWeight: 600,
//                     textTransform: "none",
//                     color: "#3b82f6",
//                     "&:hover": { backgroundColor: "#eff6ff" }
//                   }}
//                 >
//                   View All
//                 </Button>
//               }
//             >
//               <Box spacing={1.2}>
//                 {recentAlerts.length === 0 ? (
//                   <Box sx={{ 
//                     py: 4, 
//                     textAlign: "center" 
//                   }}>
//                     <NotificationsActiveIcon sx={{ 
//                       fontSize: "2.5rem", 
//                       color: "#cbd5e1", 
//                       mb: 1 
//                     }} />
//                     <Typography sx={{ 
//                       fontSize: "0.85rem", 
//                       color: "#94a3b8", 
//                       fontFamily: "'DM Sans', sans-serif" 
//                     }}>
//                       No alerts yet
//                     </Typography>
//                   </Box>
//                 ) : (
//                   recentAlerts.map((alert) => (
//                     <RecentAlertItem key={alert.id} alert={alert} />
//                   ))
//                 )}
//               </Box>
//             </SectionCard>

//           </Box>
//         </Grid>

//       </Grid>

//     </Box>
//   );
// }

// export default BranchOverview;


