"use client";
import { AppProgressBar as ProgressBarr } from 'next-nprogress-bar';

export const ProgressBar = ({ children }: any) => {

    return (
        <>
            <ProgressBarr
                height="4px"
                color="#2e2c2a"
                options={{ showSpinner: false }}
            />
            {children}
        </>
    )
}