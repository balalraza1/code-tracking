"use client";

import {
  PlayIcon,
  ChatBubbleIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "../../shadcn/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadcn/components/ui/table";
import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../shadcn/components/ui/pagination";
import { useEffect, useState } from "react";
import { authFetch, apiBaseUrl } from "../../api/utils";
import { Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// Extend dayjs with the duration plugin
dayjs.extend(duration);

const formatDate = (timestamp) => {
  return dayjs.unix(timestamp).format("DD-MM-YYYY hh:mm:ss");
};


const formatDuration = (start, end) => {
  if (start == null || end == null) return null;
  const startTime = dayjs.unix(start);
  const endTime = dayjs.unix(end);
  const durationInMilliseconds = endTime.diff(startTime);
  const durationObj = dayjs.duration(durationInMilliseconds);
  return `${durationObj.hours()} hours, ${durationObj.minutes()} minutes, ${durationObj.seconds()} seconds`;
};
let noOfPages;
let allRecordings = [];
export default function Recordings() {
  const [recordings, setRecordings] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const openURLInNewTab = (recordingUrl) => {
    navigate(`/play-recording?recordingUrl=${recordingUrl}`);
  };

  const paginateArray = (pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, allRecordings.length);

    const paginatedItems = [];
    for (let i = startIndex; i < endIndex; i++) {
      paginatedItems.push(allRecordings[i]);
    }
    return paginatedItems;
  };

  const fetchRecordings = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch({
        method: "POST",
        url: `${apiBaseUrl}/session/getSessionsByUser`,
      });
      allRecordings = response.result;
      const sortedRecordings = allRecordings.slice().sort((a, b) => {
        const startTimeA = new Date(a.startTime);
        const startTimeB = new Date(b.startTime);
        return startTimeA < startTimeB ? 1 : -1;
      });

      allRecordings = sortedRecordings;
      noOfPages = Math.ceil(allRecordings?.length / 10);
      setIsLoading(false);
      setRecordings(paginateArray(1, 10));
    } catch (error) {
      console.error("Error fetching recordings:", error);
    }
  };
  const fetchNextPage = () => {
    if (activePage < noOfPages) {
      setActivePage((prevPage) => prevPage + 1);
    }
  };

  const fetchPreviousPage = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    const pagedRecordings = paginateArray(activePage, 10);
    setRecordings(pagedRecordings);
  }, [activePage]);

  useEffect(() => {
    fetchRecordings();
  }, []);
  return (
    <>
      <div className="w-full items-center justify-center px-12 py-6">
        <div className="space-y-1 p-2">
          <h2 className="text-2xl font-semibold tracking-tight">{`Completed sessions (${
            allRecordings?.length || 0
          })`}</h2>
          <p className="text-sm text-muted-foreground">
            You can find your completed sessions here.
          </p>
        </div>
        {isLoading ? (
          <div className="grid py-4">
            <div className="flex w-full shrink-0 items-center justify-center rounded-md border border-dashed p-6">
              <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center text-center">
                <Radio size={64} />
                <h3 className="mt-4 text-lg font-semibold">
                  {"Loading sessions"}
                </h3>
              </div>
            </div>
          </div>
        ) : allRecordings ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Masterclass/Broadcast</TableHead>
                  {/* <TableHead>Stream health</TableHead>
                  <TableHead>Chat</TableHead> */}
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recordings &&
                  recordings.map((video, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(video.startTime)}</TableCell>
                      <TableCell>
                        {video.endTime ? formatDate(video.endTime) : ""}
                      </TableCell>
                      <TableCell>
                        {formatDuration(video.startTime, video.endTime)}
                      </TableCell>
                      <TableCell>
                        {video.sessionType !== "LiveClass" ? (
                          <CheckCircledIcon className="h-8 w-8 shrink-0 text-green-500" />
                        ) : (
                          <CrossCircledIcon className="h-8 w-8 shrink-0 text-red-500" />
                        )}
                      </TableCell>
                      {/* <TableHead>
                        <Button
                          variant="link"
                          role="combobox"
                          onClick={() => console.log("stream health")}
                        >
                          <HeartPulse className="h-8 w-8 shrink-0" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="link"
                          role="combobox"
                          onClick={() => console.log("chat")}
                        >
                          <ChatBubbleIcon className="h-8 w-8 shrink-0" />
                        </Button>
                      </TableHead> */}
                      <TableHead className="text-right">
                        {video.endTime ? (
                          <Button
                            variant="link"
                            role="combobox"
                            onClick={() => openURLInNewTab(video?.recordingUrl)}
                          >
                            <PlayIcon className="h-8 w-8 shrink-0" />
                          </Button>
                        ) : (
                          <Badge
                            variant="withIconDestructive"
                            icon={<Radio size={14} />}
                            className="cursor-pointer"
                          >
                            LIVE
                          </Badge>
                        )}
                      </TableHead>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    size="sm"
                    onClick={fetchPreviousPage}
                  />
                </PaginationItem>
                {/* {
                            arr && arr.map(pageNumber => (
                                <PaginationItem>
                                    <PaginationLink size="sm" href="#" onClick={() => setActivePage(pageNumber)}>{pageNumber}</PaginationLink>
                                </PaginationItem>
                            ))
                        }
                        {
                            noOfPages > 3 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        } */}
                <PaginationItem>
                  <PaginationNext size="sm" href="#" onClick={fetchNextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <div className="grid py-4">
            <div className="flex w-full shrink-0 items-center justify-center rounded-md border border-dashed p-6">
              <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center text-center">
                <Radio size={64} />
                <h3 className="mt-4 text-lg font-semibold">
                  {"No completed sessions"}
                </h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  {
                    "Currently, there are no completed sessions. Check back later for updates and stay tuned for future sessions."
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
