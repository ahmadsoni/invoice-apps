import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProductProps {
  onOpenPreviewChange: (value: boolean) => void;
}
export default function HeaderProduct(props: HeaderProductProps) {
  return (
     <Card className="w-full mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <CardTitle className="text-2xl font-bold">Create Invoice Document</CardTitle>
            <Button variant="ghost" onClick={() => props.onOpenPreviewChange(true)} className="text-primary font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-name">Invoice Name</Label>
                <div className="relative">
                  <Input
                    id="invoice-name"
                    placeholder="Enter invoice name"
                    defaultValue="Spencers Order Invoice"
                    className="pr-8"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}
