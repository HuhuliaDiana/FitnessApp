package com.fitnessapp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    @NotEmpty
    @Size(min = 2, message = "Firstname should have at least 2 characters")
    private String firstname;
    @NotEmpty
    @Size(min = 2, message = "Lastname should have at least 2 characters")
    private String lastname;
    @NotEmpty
    @Email
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @ToString.Exclude
    private String password;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private RoleDto userRole;
}
