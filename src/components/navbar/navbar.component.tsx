import { Box, Stack, Typography, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/react.svg';

import { useEffect, useState } from 'react'


export const NAV_TYPES = {
  USER: 'USER',
};




const NAV_MAPPING: { type: typeof NAV_TYPES[keyof typeof NAV_TYPES]; url: string[] }[] = [
    {
        type: NAV_TYPES.USER,
        url: ["/"]
    },
   
]

export const NavbarComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const [value, setValue] = useState<typeof NAV_TYPES[keyof typeof NAV_TYPES] | null>(() => {
        const nav = NAV_MAPPING.find((item) => item.url.findIndex((url) => location.pathname.indexOf(url) > -1) > -1);
        return nav?.type ?? null;
    });

    useEffect(() => {
        const nav = NAV_MAPPING.find((item) => item.url.findIndex((url) => pathname.indexOf(url) > -1) > -1);
        if (!!nav) {
            setValue(nav.type);
        }
    }, [pathname]);

    const isActive = (type: typeof NAV_TYPES[keyof typeof NAV_TYPES]) => {
        return value === type;
    };

    const onClickNav = (href: string) => {
        navigate(href);
    };
    return (
        <>
            <Box 
                sx={{ 
                    position: "fixed",
                    left: 0,
                    top: 0,
                    height: "100vh",
                    minWidth: "200px",
                    backgroundColor: "#080F25",
                    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Logo Section */}
                <Box sx={{ padding: "10px", textAlign: "center", display: "flex", alignItems: "center", gap: "5px" }}>
                    <img src={Logo} alt="Logo" width={30} height={30}/>
                    <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 600 }}>Employee Dashboard</Typography>
                </Box>

                <Divider sx={{ marginBottom: "10px", backgroundColor: "#2d3a5f" }} />

                {/* Navigation Items */}
                <Box sx={{ width: "100%", flex: 1 }}>
                    <Stack flexDirection={"column"} gap={1}>
                        <Stack 
                        onClick={() => onClickNav("/")}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        gap={"5px"}
                        sx={{ 
                            cursor: "pointer",
                            padding: "12px 16px",
                            // borderRadius: "8px",
                            position: "relative",
                            backgroundColor: isActive(NAV_TYPES.USER) ? "rgba(25, 166, 223, 0.1)" : "transparent",
                            "&:hover": {
                                backgroundColor: "rgba(25, 166, 223, 0.05)"
                            }
                        }}
                            
                        >
                            <PeopleIcon sx={{ fontSize: "20px", color: isActive(NAV_TYPES.USER) ? "#19A6DF" : "#d5cfcfff" }} />
                            <Typography
                                color={isActive(NAV_TYPES.USER) ? "#19A6DF" : "#fff"}
                                component={"div"}
                                fontSize={"14px"}
                                lineHeight={"20px"}
                                fontWeight={isActive(NAV_TYPES.USER) ? 700 : 500}
                            >
                                User
                            </Typography>
                        </Stack>
                        {/* <Stack 
                        onClick={() => onClickNav("/learn")}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        gap={"5px"}
                        sx={{ 
                            cursor: "pointer",
                            padding: "12px 16px",
                            // borderRadius: "8px",
                            position: "relative",
                            backgroundColor: isActive(NAV_TYPES.LEARN) ? "rgba(25, 166, 223, 0.1)" : "transparent",
                            "&:hover": {
                                backgroundColor: "rgba(25, 166, 223, 0.05)"
                            }
                        }}
                        >
                            <SettingsIcon sx={{ fontSize: "20px", color: isActive(NAV_TYPES.LEARN) ? "#19A6DF" : "#d5cfcfff" }} />
                            <Typography
                                color={isActive(NAV_TYPES.LEARN) ? "#19A6DF" : "#fff"}
                                component={"div"}
                                fontSize={"14px"}
                                lineHeight={"20px"}
                                fontWeight={isActive(NAV_TYPES.LEARN) ? 700 : 500}
                            >
                                Settings
                            </Typography>
                        </Stack> */}
                    </Stack>
                </Box>

                
                {/* <Box>
                    //account
                </Box> */}
            </Box>
        </>
    )
}
