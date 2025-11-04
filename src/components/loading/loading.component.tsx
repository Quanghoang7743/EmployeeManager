import { Box } from '@mui/material'


export default function Loading() {
    return (
        <>
            <Box
                className="loader"
                sx={{
                    width: "50px",
                    padding: "8px",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: "#25b09b",
                    "--_m": `
                    conic-gradient(#0000 10%,#000),
                    linear-gradient(#000 0 0) content-box
                    `,
                    WebkitMask: "var(--_m)",
                    mask: "var(--_m)",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "subtract",
                    animation: "l3 1s infinite linear",
                    "@keyframes l3": {
                        to: { transform: "rotate(1turn)" }
                    }
                }}
            />
        </>
    )
}
