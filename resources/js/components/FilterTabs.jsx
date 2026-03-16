import { cn } from "@/lib/utils";

export default function FilterTabs({ tabs, activeTab, onChange }) {
    return (
        <div className="mb-4 -mx-4 px-4 overflow-x-auto">
            <div className="flex flex-nowrap gap-2 min-w-max">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onChange(tab.value)}
                        className={cn(
                            "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0",
                            activeTab === tab.value
                                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700",
                        )}
                    >
                        {tab.icon && (
                            <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                            <span
                                className={cn(
                                    "text-xs",
                                    tab.showBadge
                                        ? cn(
                                              "px-1.5 py-0.5 rounded-full font-medium",
                                              activeTab === tab.value
                                                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                                                  : "bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800",
                                          )
                                        : "text-muted-foreground",
                                )}
                            >
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
