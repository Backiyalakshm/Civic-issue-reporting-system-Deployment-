package com.civic.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "assets")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    private String location;
    private Double latitude;
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.OPERATIONAL;

    @Column(name = "last_maintenance_date")
    private LocalDate lastMaintenanceDate;

    private String description;

    public enum Status { OPERATIONAL, NEEDS_MAINTENANCE, UNDER_MAINTENANCE, OUT_OF_SERVICE }

    public Asset() {}

    public Asset(Long id, String name, String type, String location, Double latitude, Double longitude,
                 Status status, LocalDate lastMaintenanceDate, String description) {
        this.id = id; this.name = name; this.type = type; this.location = location;
        this.latitude = latitude; this.longitude = longitude; this.status = status;
        this.lastMaintenanceDate = lastMaintenanceDate; this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDate getLastMaintenanceDate() { return lastMaintenanceDate; }
    public void setLastMaintenanceDate(LocalDate lastMaintenanceDate) { this.lastMaintenanceDate = lastMaintenanceDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
