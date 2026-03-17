"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { reportTypes, currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
  FileText,
  Image as ImageIcon,
  Film,
} from "lucide-react";

type WizardPhase = "eligibility" | "form" | "evidence" | "review";

export default function ReportWizardPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, t } = useLocale();

  const reportType = reportTypes.find((rt) => rt.id === params.type);

  const [phase, setPhase] = useState<WizardPhase>(
    reportType?.eligibilityQuestions.length ? "eligibility" : "form"
  );
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<string, boolean>>({});
  const [disqualified, setDisqualified] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<{ name: string; size: number; type: string }[]>([]);

  const totalSteps = useMemo(() => {
    if (!reportType) return 0;
    const steps = new Set(reportType.fields.map((f) => f.step));
    return steps.size;
  }, [reportType]);

  const overallProgress = useMemo(() => {
    if (phase === "eligibility") return 5;
    if (phase === "form") return 10 + (currentStep / totalSteps) * 60;
    if (phase === "evidence") return 80;
    return 95;
  }, [phase, currentStep, totalSteps]);

  if (!reportType) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-xl font-semibold mb-2">Report type not found</h1>
        <Button variant="outline" onClick={() => router.push("/report")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Report Types
        </Button>
      </div>
    );
  }

  const currentFields = reportType.fields.filter((f) => f.step === currentStep);
  const groups = Array.from(new Set(currentFields.map((f) => f.group)));

  const phaseLabels = [
    reportType.eligibilityQuestions.length ? t("report.eligibility") : null,
    ...Array.from({ length: totalSteps }, (_, i) => `${t("report.step")} ${i + 1}`),
    reportType.evidenceMode !== "disabled" ? t("report.evidence") : null,
    t("report.review"),
  ].filter(Boolean) as string[];

  function validateStep(): boolean {
    const newErrors: Record<string, string> = {};
    for (const field of currentFields) {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${locale === "fr" ? field.labelFr : field.label} is required`;
      }
      if (field.validation && formData[field.id]) {
        const val = Number(formData[field.id]);
        if (field.validation.max !== undefined && val > field.validation.max) {
          newErrors[field.id] = field.validation.message || `Value must be at most ${field.validation.max}`;
        }
        if (field.validation.min !== undefined && val < field.validation.min) {
          newErrors[field.id] = field.validation.message || `Value must be at least ${field.validation.min}`;
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (phase === "eligibility") {
      setPhase("form");
      return;
    }
    if (phase === "form") {
      if (!validateStep()) return;
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else if (reportType!.evidenceMode !== "disabled") {
        setPhase("evidence");
      } else {
        setPhase("review");
      }
      return;
    }
    if (phase === "evidence") {
      setPhase("review");
      return;
    }
    // Submit
    const id = `WRPS-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    router.push(`/confirmation/${encodeURIComponent(id)}`);
  }

  function handleBack() {
    if (phase === "review") {
      setPhase(reportType!.evidenceMode !== "disabled" ? "evidence" : "form");
      return;
    }
    if (phase === "evidence") {
      setPhase("form");
      setCurrentStep(totalSteps);
      return;
    }
    if (phase === "form" && currentStep > 1) {
      setCurrentStep(currentStep - 1);
      return;
    }
    if (phase === "form" && reportType!.eligibilityQuestions.length) {
      setPhase("eligibility");
      return;
    }
    router.push("/report");
  }

  function handleEligibilityAnswer(qId: string, answer: boolean) {
    setEligibilityAnswers((prev) => ({ ...prev, [qId]: answer }));
    const question = reportType!.eligibilityQuestions.find((q) => q.id === qId);
    if (answer && question?.disqualifyOnYes) {
      setDisqualified(locale === "fr" ? question.redirectMessageFr : question.redirectMessage);
    }
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    }));
    setFiles((prev) => [...prev, ...dropped]);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    }));
    setFiles((prev) => [...prev, ...selected]);
  }

  function getFileIcon(type: string) {
    if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
    if (type.startsWith("video/")) return <Film className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl md:text-2xl font-bold">
            {locale === "fr" ? reportType.nameFr : reportType.name}
          </h1>
          <span className="text-sm text-muted-foreground">
            {Math.round(overallProgress)}%
          </span>
        </div>
        <Progress value={overallProgress} className="h-2" />
        {/* Step indicators */}
        <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
          {phaseLabels.map((label, i) => {
            const active =
              (phase === "eligibility" && i === 0) ||
              (phase === "form" && i === (reportType.eligibilityQuestions.length ? currentStep : currentStep - 1)) ||
              (phase === "evidence" && i === phaseLabels.length - 2) ||
              (phase === "review" && i === phaseLabels.length - 1);
            return (
              <span
                key={i}
                className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                  active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-gray-100 text-muted-foreground"
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Disqualified */}
      {disqualified && (
        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="flex items-start gap-3 p-5">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800 mb-1">Not Eligible for Online Reporting</p>
              <p className="text-sm text-red-700">{disqualified}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => router.push("/report")}
              >
                <ArrowLeft className="mr-2 h-3 w-3" /> Choose a Different Report Type
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Eligibility Phase */}
      {phase === "eligibility" && !disqualified && (
        <Card>
          <CardHeader>
            <CardTitle>{t("report.eligibility")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("report.eligibility_desc")}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportType.eligibilityQuestions.map((q) => (
              <div key={q.id} className="rounded-lg border p-4">
                <p className="font-medium text-sm mb-3">
                  {locale === "fr" ? q.questionFr : q.question}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant={eligibilityAnswers[q.id] === false ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleEligibilityAnswer(q.id, false)}
                    style={
                      eligibilityAnswers[q.id] === false
                        ? { backgroundColor: currentAgency.primaryColor }
                        : {}
                    }
                  >
                    No
                  </Button>
                  <Button
                    variant={eligibilityAnswers[q.id] === true ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => handleEligibilityAnswer(q.id, true)}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Form Phase */}
      {phase === "form" && (
        <Card>
          <CardHeader>
            <CardTitle>
              {t("report.step")} {currentStep} {t("report.of")} {totalSteps}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {groups.map((group) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  {group}
                </h3>
                <div className="space-y-4">
                  {currentFields
                    .filter((f) => f.group === group)
                    .map((field) => (
                      <div key={field.id}>
                        <Label htmlFor={field.id} className="text-sm font-medium">
                          {locale === "fr" ? field.labelFr : field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </Label>
                        {field.type === "textarea" ? (
                          <Textarea
                            id={field.id}
                            placeholder={locale === "fr" ? field.placeholderFr : field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
                            }
                            className="mt-1.5"
                            rows={4}
                          />
                        ) : field.type === "select" ? (
                          <Select
                            value={formData[field.id] || ""}
                            onValueChange={(val) =>
                              setFormData((prev) => ({ ...prev, [field.id]: val }))
                            }
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {locale === "fr" ? opt.labelFr : opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={field.id}
                            type={
                              field.type === "number"
                                ? "number"
                                : field.type === "date"
                                ? "date"
                                : field.type === "time"
                                ? "time"
                                : field.type === "email"
                                ? "email"
                                : field.type === "phone"
                                ? "tel"
                                : "text"
                            }
                            placeholder={locale === "fr" ? field.placeholderFr : field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
                            }
                            className="mt-1.5"
                            min={field.validation?.min}
                            max={field.validation?.max}
                          />
                        )}
                        {errors[field.id] && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Evidence Phase */}
      {phase === "evidence" && (
        <Card>
          <CardHeader>
            <CardTitle>{t("report.evidence")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("report.evidence_desc")}</p>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-input")?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload evidence files"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document.getElementById("file-input")?.click();
                }
              }}
            >
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium text-sm">{t("report.evidence_drag")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("report.evidence_types")}</p>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.mp4,.mov,.pdf,.docx"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Review Phase */}
      {phase === "review" && (
        <Card>
          <CardHeader>
            <CardTitle>{t("report.review")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("report.review_desc")}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Type */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Report Type
              </h3>
              <p className="text-sm">{locale === "fr" ? reportType.nameFr : reportType.name}</p>
            </div>
            <Separator />

            {/* Form Data */}
            {reportType.fields.map((field) => {
              const value = formData[field.id];
              if (!value) return null;
              return (
                <div key={field.id}>
                  <p className="text-xs font-medium text-muted-foreground">
                    {locale === "fr" ? field.labelFr : field.label}
                  </p>
                  <p className="text-sm mt-0.5 whitespace-pre-wrap">{value}</p>
                </div>
              );
            })}

            {files.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Evidence Files ({files.length})
                  </h3>
                  <div className="space-y-1">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                        {f.name}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">Before you submit:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Review all information above for accuracy</li>
                <li>False reports are a criminal offence</li>
                <li>You will receive a confirmation email with your tracking number</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {!disqualified && (
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("report.back")}
          </Button>
          <Button
            onClick={handleNext}
            style={{ backgroundColor: currentAgency.primaryColor }}
            disabled={
              phase === "eligibility" &&
              Object.keys(eligibilityAnswers).length < reportType.eligibilityQuestions.length
            }
          >
            {phase === "review" ? (
              <>
                {t("report.submit")}
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                {t("report.next")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
