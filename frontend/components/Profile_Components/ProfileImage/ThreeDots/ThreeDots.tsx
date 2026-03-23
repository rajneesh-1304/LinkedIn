'use client';
import React, { useEffect, useRef, useState } from 'react';
import './threedots.css';
import { addConnectionThunk, checkConnectionThunk, getPendingConnectionThunk, removeConnectionThunk, updateConnectionThunk } from '@/redux/features/connection/connectionSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Box, Button } from '@mui/material';

export const ThreeDots = ({ id, userId, close }: { id: string, userId: any, close: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<null | {
    status: string;
    requesterId: any;
    userId: any;
    isRequester: boolean;
  }>(null);

  const dispatch = useAppDispatch();

  const handleAccept = async () => {
    try {
      await dispatch(updateConnectionThunk({ id: id, userId })).unwrap();
      dispatch(getPendingConnectionThunk({ id: id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(removeConnectionThunk({ id: id, userId })).unwrap();
      dispatch(getPendingConnectionThunk({ id: id }));
    } catch (error) {
      console.log(error);
    }
  };

  const checkConnectionStatus = async () => {
      if (!id || !userId) return;
  
      try {
        const res = await dispatch(
          checkConnectionThunk({ id: userId, userId: id })
        ).unwrap();
  
        setConnectionStatus(res || null);
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  const handleConnect = async () => {
    if (!id || !userId) return;

    try {
      await dispatch(
        addConnectionThunk({ id: userId, userId: id })
      ).unwrap();

      setConnectionStatus({
        status: "PENDING",
        requesterId: id,
        userId,
        isRequester: true,
      });

    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    if (!id || !userId) return;

    try {
      await dispatch(
        removeConnectionThunk({ id: userId, userId: id })
      ).unwrap();

      setConnectionStatus({
        status: "PENDING",
        requesterId: id,
        userId,
        isRequester: true,
      });

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkConnectionStatus();
  }, [id, userId]);


  return (
    <div className="dropdown" ref={ref}>
      {connectionStatus?.status === "PENDING" ? (
        connectionStatus.isRequester ? (
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, borderRadius: "999px" }}
          >
            Pending
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button fullWidth variant="contained" onClick={handleAccept}>
              Accept
            </Button>
            <Button fullWidth variant="outlined" onClick={handleReject}>
              Reject
            </Button>
          </Box>
        )
      ) : (connectionStatus?.status !== 'CONNECTED'? 
        (
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 1, borderRadius: "999px" }}
          onClick={handleConnect}
        >
          Connect
        </Button>
      ) : 
      (
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 1, borderRadius: "999px", margin:'auto' }}
          onClick={handleDisconnect}
        >
          Remove Connection
        </Button>
      )
      )}
      <button className="dropdown-item">Send PDF</button>
      <button className="dropdown-item">Report/Block</button>
    </div>
  );
};